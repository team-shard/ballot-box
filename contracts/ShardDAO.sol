//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


/// @notice This is a contract that depicts the features of voting in a decentralized autonomous organization
contract ShardDAO {

    /// @notice An event that is emitted when a group of participants is registered
    event Register(address[] particants, Roles assignedRole, uint registeredAt);

    /// @notice Voted event is emitted after a succesful casting of vote
    event Voted(address voter);

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

    /// @notice Initializes the value of nameOfPosition variable, create and register chairman.
    /// @dev Takes in a string and assings it to nameOfPosition.
    /// @param _nameOfPosition name of position being contested.
    constructor(string memory _nameOfPosition) {
        nameOfPosition = _nameOfPosition;
        chairman = msg.sender;
        particants[chairman] = Participant({voted: false, registered: true, role: Roles.CHAIRMAN});
    }

    /// @notice Used to restrict access to certain features to only chairman.
    modifier onlyChairman {
        require(msg.sender == chairman, "Only Chairman can perform this action!");
        _;
    }

    /// @notice Changes the name of position being contested for
    /// @dev Reassigns the value of nameOfPosition variable to input string
    /// @param _nameOfPosition new name of position.
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

    /// @notice Cast your vote
    /// @param _contestantId to identify who the voter is voting for
    function vote(uint _contestantId) external {
        require(particants[msg.sender].registered, "Not eligible to vote, please register");
        Participant storage voter = particants[msg.sender];
        require(!voter.voted, "Already voted.");
        voter.voted = true;

        // If `_contestantId` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        contestants[_contestantId].voteCount += 1;
        emit Voted(msg.sender);
    }

    /// @dev Computes the election results
    function winningContestant() internal view
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
    /// @notice returns the address of the winner
    function winnerName() external view onlyChairman
            returns (address winnerName_)
    {
        winnerName_ = contestants[winningContestant()].contestantAddress;
    }
}
