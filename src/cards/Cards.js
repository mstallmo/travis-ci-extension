import React from 'react';
import styled from 'styled-components';

const BranchName = styled.p`
    display: inline;
    font-weight: bold;
`;

const CommitMessage = styled.p`
    display: inline;
    padding-left: 2em;
`;

const style = {
    borderLeftWidth: '.5rem',
    borderLeftColor: '#28a745'
};

const Card = ({branchName, commitMessage, buildNumber, buildState}) => {
    return (
        <div className={'card ' + (buildState === 'passed' ? 'border-success' : 'border-danger')} style={style}>
            <div className={'card-body ' + (buildState === 'passed'? 'text-success' : 'text-danger')}>
                <BranchName>#{buildNumber} {buildState} {branchName}</BranchName><CommitMessage>{commitMessage}</CommitMessage>
            </div>
        </div>
    )
}

export default Card
