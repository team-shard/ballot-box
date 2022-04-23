//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/Pausable.sol";
import "./AccessControl.sol";

/// @title A decentralized autonomous organization 
/// @notice This is a contract that depicts the features of voting in a decentralized autonomous organization
contract ShardDAO is Pausable, AccessControl {

    /// @notice An event that is emitted when a group of participants is registered
    event Register(address[] particants, string assignedRole, uint registeredAt);

    /// @notice Voted event is emitted after a succesful casting of vote
    event Voted(address voter, uint votedAt);

    /// @notice An event that logs the election winner
    event Winner(string electionWinner, address winnerAddr);

    /// @notice Emitted once the election starts
    event electionStarted(uint startTime, uint electionDuration);

    /// @notice Emitted when the election is concluded
    event electionEnded(uint endTime);
    
    /// @notice Struct representing all the features of a voting participant
    struct Participant {
        bool voted;
        bool registered;
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
    Contestant[] private contestants;

    /// @notice Stores the address of chairman 
    address public chairman;

    /// @notice This is the leadership postion that contestants will be voted for 
    string public nameOfPosition;
    
    // Voting start time
    uint private startTime;

    // Time that voters have to vote since startTime;
    uint public timeToVote;

    bool public isOnging;

    /// The vote has been called too late.
    error TooLate();

    /// @notice Total number of vote
    uint256 private totalVoteCount;

    /// @notice Initializes the value of nameOfPosition variable, create and register chairman.
    /// @dev Takes in a string and assings it to nameOfPosition.
    /// @param _nameOfPosition name of position being contested.
    constructor(string memory _nameOfPosition) {
        nameOfPosition = _nameOfPosition;
        chairman = msg.sender;
        particants[chairman] = Participant({voted: false, registered: true});
        _pause();
    }


    modifier whenEnded() {
        require(block.timestamp >= (startTime + timeToVote), "Wait for election to end");
        _;
    }

    modifier whenNotEnded() {
        require(timeToVote > 0, "Wait for election to start");
        if (block.timestamp >= (startTime + timeToVote)) revert TooLate();
        _;
    }

    /// @param contestantName name of contestant to be added.
    /// @param contestantAddress address of contestant to be added.
    /// @dev adds the contestant with an id i
    function addContestant(string[] memory contestantName, address[] memory contestantAddress) external  isChairOrTeach() {
        require(contestantName.length == contestantAddress.length, "Array lengths must match!");
        for (uint i = 0; i < contestantName.length; i++)
         { 
            require(particants[contestantAddress[i]].registered, "Contestant not registered!"); 
            contestants.push(Contestant({
                contestantName: contestantName[i],
                contestantAddress: contestantAddress[i],
                voteCount:0
            }));
        }
    }

    /// @notice Returns details about all the contestants
    /// @dev    Details returned are the one's stored in the blockchain on upload.
    /// @return contestantName names of all contestants.
    /// @return contestantAddress address of all contestants.
    /// @return voteCount of all contestants.
    function getAllContestants() external view isChairOrTeach
    returns(string[] memory, address[] memory, uint[] memory) {
        uint len = contestants.length;

        string [] memory contestantName = new string[](len);
        address [] memory contestantAddress = new address[](len);
        uint [] memory voteCount = new uint[](len);

        for (uint i = 0; i < len; i++) {
            contestantName[i] = contestants[i].contestantName;
            contestantAddress[i] = contestants[i].contestantAddress;
            voteCount[i] = contestants[i].voteCount;
        }

        return(contestantName, contestantAddress, voteCount);
    }


    /// @notice Changes the name of position being contested for
    /// @dev Reassigns the value of nameOfPosition variable to input string
    /// @param _nameOfPosition new name of position
    /// @return bool a true value if action was successful
    function changeNameOfPosition(string memory _nameOfPosition) external onlyRole(Chairman) returns (bool) {
        nameOfPosition = _nameOfPosition;
        return true;
    }

    /// @notice This function registers group of address as students
    /// @dev Takes in an array of address input and assigns student role
    /// @param students An array of address 
    function registerStudent(address[] memory students) external isChairOrTeach(){
        for (uint i = 0; i < students.length; i++) {
            require(!particants[students[i]].registered, "Student already registered");
            particants[students[i]] = Participant({voted: false, registered: true});
            _grantRole(Students, students[i]);
        }
        emit Register(students, "STUDENT", block.timestamp);
    }

    /// @notice This function registers group of address as board members
    /// @dev Takes in an array of address input and assigns board member role
    /// @param board_members An array of address 
    function registerBoardMember(address[] memory board_members) external isChairOrTeach(){
        for (uint i = 0; i < board_members.length; i++) {
            require(!particants[board_members[i]].registered, "Board Member already registered");
            particants[board_members[i]] = Participant({voted: false, registered: true});
            _grantRole(Board, board_members[i]);
        }
        emit Register(board_members, "BOARD MEMBER", block.timestamp);
    }

    /// @notice This function registers group of address as teachers
    /// @dev Takes in an array of address input and assigns teacher role
    /// @param teachers An array of address 
    function registerTeacher(address[] memory teachers) external isChairOrTeach(){
        for (uint i = 0; i < teachers.length; i++) {
            require(!particants[teachers[i]].registered, "Teacher already registered");
            particants[teachers[i]] = Participant({voted: false, registered: true});
            _grantRole(Teachers, teachers[i]);
        }
        emit Register(teachers, "TEACHER", block.timestamp);
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
        totalVoteCount++;
        emit Voted(msg.sender, block.timestamp);
    }

    /// @notice Return total number of votes
    /// @return totalVoteCount 
    function getTotalVoteCount() external view returns (uint){
        return totalVoteCount;
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

    
    /// @notice returns name and address of the winner
    function winnerNameAndAddress() public isChairOrTeach() whenEnded whenNotPaused
            returns (string memory winnerName_, address winnerAddress_)
    {
        uint index = _winningContestant();
        winnerName_ = contestants[index].contestantName;
        winnerAddress_ = contestants[index].contestantAddress;
        emit Winner(winnerName_, winnerAddress_);
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
    /// Intended to increase election duration incase of unforseen emergencies
    /// @param _time the duration of an election
    function setVoteTime(uint _time) external 
            isChairOrTeach whenEnded
            returns (bool) 
    {
        require(timeToVote > 0, "Only available after election starts"); // timeTVote is set to zero only when we endElection()
        startTime = block.timestamp;
        timeToVote = _time;
        return true;
    }

    /// @notice Starts the election
    /// @param _time Duration of the election
    function startElection(uint _time) external 
            isChairOrTeach 
     {
        require(timeToVote == 0, "Election has already started"); // Only start a new election if it has not been started
        require(contestants.length > 0, "Please register at least one contestant");
        startTime = block.timestamp;
        timeToVote = _time;
        isOnging = true;
        _unpause();
        emit electionStarted(startTime, _time);
    }

    function endElection()  external isChairOrTeach whenEnded returns (string memory, address) {
        isOnging = false;
        timeToVote = 0;
        emit electionEnded(block.timestamp);
        return winnerNameAndAddress();
    }
}
