//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/Pausable.sol";
import "./accessControl.sol";

/// @title A decentralized autonomous organization 
/// @notice This is a contract that depicts the features of voting in a decentralized autonomous organization
contract ShardDAO is Pausable, AccessControl {

    /// @notice An event that is emitted when a group of participants is registered
    event Register(address[] particants, Roles assignedRole, uint registeredAt);

    /// @notice Voted event is emitted after a succesful casting of vote
    event Voted(address voter, uint votedAt);

    /// @notice Enumeration of all posible roles an address can be assigned
    enum Roles {
        CHAIRMAN,
        BOARDMEMBER,
        TEACHER,
        STUDENT
    }
    
    /// @notice Struct representing all the features of a voting participant
    struct Participant {
        bool voted;
        bool registered;
        Roles role;
    }
    
    /// @notice Struct representing all the features of a position contestant
    struct Contestant {
        string contestantName;
        address contestantAddress;
        uint voteCount;
    }

    /// @notice Mapping of addresses to participants
    mapping(address => Participant) public particants;

    /// @notice An array of contestants
    Contestant[] public contestants;

    /// @notice Stores the address of chairman 
    address public chairman;

    /// @notice This is the leadership postion that contestants will be voted for 
    string public nameOfPosition;

    
    // Voting start time
    uint private startTime;

    // Time that voters have to vote since startTime;
    uint private timeToVote;

    /// The vote has been called too late.
    error TooLate();

    /// @notice Initializes the value of nameOfPosition variable, create and register chairman.
    /// @dev Takes in a string and assings it to nameOfPosition.
    /// @param _nameOfPosition name of position being contested.
    constructor(string memory _nameOfPosition) {
        nameOfPosition = _nameOfPosition;
        chairman = msg.sender;
        particants[chairman] = Participant({voted: false, registered: true, role: Roles.CHAIRMAN});
        _pause();
    }

    /// @param contestantName name of contestant to be added.
    /// @param contestantAddress address of contestant to be added.
    /// @dev adds the contestant with an id i
    function addContestant(string[] memory contestantName, address[] memory contestantAddress) public onlyRole(Chairman) onlyRole(Teachers){

         for (uint i = 0; i < contestantName.length; i++)
         for (uint a = 0; i < contestantAddress.length; a++)
         {
            
            contestants.push(Contestant({
                contestantName: contestantName[i],
                contestantAddress: contestantAddress[a],
                voteCount:0
            }));
        }
    }

    /// @notice Used to restrict access to certain features to only chairman.
    modifier onlyChairman {
        require(msg.sender == chairman, "Only Chairman can perform this action!");
        _;
    }

    /// @notice Changes the name of position being contested for
    /// @dev Reassigns the value of nameOfPosition variable to input string
    /// @param _nameOfPosition new name of position
    /// @return bool a true value if action was successful
    function changeNameOfPosition(string memory _nameOfPosition) public onlyChairman returns (bool) {
        nameOfPosition = _nameOfPosition;
        return true;
    }

    /// @notice This function registers group of address as students
    /// @dev Takes in an array of address input and assigns student role
    /// @param students An array of address 
    function registerStudent(address[] memory students) public onlyChairman{
        for (uint i = 0; i < students.length; i++) {
            require(!particants[students[i]].registered, "Student already registered");
            particants[students[i]] = Participant({voted: false, registered: true, role: Roles.STUDENT});
        }
        emit Register(students, Roles.STUDENT, block.timestamp);
    }

    /// @notice This function registers group of address as board members
    /// @dev Takes in an array of address input and assigns board member role
    /// @param board_members An array of address 
    function registerBoardMember(address[] memory board_members) public onlyChairman{
        for (uint i = 0; i < board_members.length; i++) {
            require(!particants[board_members[i]].registered, "Board Member already registered");
            particants[board_members[i]] = Participant({voted: false, registered: true, role: Roles.BOARDMEMBER});
        }
        emit Register(board_members, Roles.BOARDMEMBER, block.timestamp);
    }

    /// @notice This function registers group of address as teachers
    /// @dev Takes in an array of address input and assigns teacher role
    /// @param teachers An array of address 
    function registerTeacher(address[] memory teachers) public onlyChairman{
        for (uint i = 0; i < teachers.length; i++) {
            require(!particants[teachers[i]].registered, "Teacher already registered");
            particants[teachers[i]] = Participant({voted: false, registered: true, role: Roles.TEACHER});
        }
        emit Register(teachers, Roles.TEACHER, block.timestamp);
    }
    
    modifier whenNotEnded() {
        if (block.timestamp >= (startTime + timeToVote)) revert TooLate();
        _;
    }

    /// @notice Cast your vote
    /// @param _contestantId to identify who the voter is voting for
    function vote(uint _contestantId) external 
            whenNotPaused whenNotEnded 
    {
        require(particants[msg.sender].registered, "Not eligible to vote, please register");
        Participant storage voter = particants[msg.sender];
        require(!voter.voted, "Already voted.");
        voter.voted = true;

        // If `_contestantId` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        contestants[_contestantId].voteCount += 1;
        emit Voted(msg.sender, block.timestamp);
    }

    /// @dev Computes the election results
    function _winningContestant() internal view
            returns (uint winningContestant_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < contestants.length; p++) {
            if (contestants[p].voteCount > winningVoteCount) {
                winningVoteCount = contestants[p].voteCount;
                winningContestant_ = p;
            }
        }
    }

    modifier whenEnded() {
        require(block.timestamp >= (startTime + timeToVote));
        _;
    }
    /// @notice returns name and address of the winner
    function winnerNameAndAddress() external  
            onlyRole(Chairman) onlyRole(Board) onlyRole(Teachers) whenEnded whenNotPaused
            returns (string memory winnerName_, address winnerAddress_)
    {
        uint index = _winningContestant();
        winnerName_ = contestants[index].contestantName;
        winnerAddress_ = contestants[index].contestantAddress;
        timeToVote = 0;
    }
    
    ///@notice Emergency stop election
    function pause() external onlyRole(Chairman) {
        _pause();
    }

    
    /// @notice Switch to continue the election after an emergency stop`
    function unpause() external onlyRole(Chairman) {
        _unpause();
    }
    
    /// @dev the passed argument should be the intended duration in seconds
    /// @notice Allows the chairman or teacher role to reset the duration of an election
    /// @param _time the duration of an election
    function setVoteTime(uint _time) public 
            onlyRole(Chairman) onlyRole(Teachers) whenEnded
            returns (bool) 
    {
        timeToVote = _time;
        return true;
    }
}
