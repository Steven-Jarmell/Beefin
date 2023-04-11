import React, { useState } from 'react';
//import './GroupsPage.css';
import '../CSS/GroupsPage.css'


function GroupPage() {
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleJoinGroup = () => {
    // join group
  };

  const handleCreateGroup = () => {
    // create group
  };

  const handleLeaveGroup = () => {
    // leave group
  };

  const handleViewGroupMembers = () => {
    // view group members
  };

  const handleSearch = () => {
    // search for group
  };

  return (
    <div className="GroupPage">
      <div className="group-container">
        <div className="create-group-container">
          <div className="group-name">
            <h1>Create Group</h1>
            <input type="text" placeholder="Group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <button onClick={handleCreateGroup}>Create Group</button>
          </div>
          <div className="group-members">
            <h2>Members</h2>
            <ul>
              {groupMembers.map((member) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
            <input type="text" placeholder="Add member" />
            <button onClick={handleCreateGroup}>Add</button>
          </div>
        </div>
        <div className="search-group-container">
          <div className="search-group">
            <h1>Search and Join Group</h1>
            <input type="text" placeholder="Search for group" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="group-results">
            <h2>Results</h2>
            <ul>
              <li>Group 1 <button onClick={handleJoinGroup}>Join Group</button></li>
              <li>Group 2 <button onClick={handleJoinGroup}>Join Group</button></li>
              <li>Group 3 <button onClick={handleJoinGroup}>Join Group</button></li>
              <li>Group 4 <button onClick={handleJoinGroup}>Join Group</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupPage;


