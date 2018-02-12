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

function cardStyleColor(buildState, className) {
    if (buildState === 'passed') {
        return (className === 'card' ? 'border-success' : 'text-success');
    } else if (buildState === 'started'){
        return (className === 'card' ? 'border-warning' : 'text-warning');
    } else {
        return (className === 'card' ? 'border-danger' : 'text-danger');
    }
}

const Card = ({branchName, commitMessage, buildNumber, buildState}) => {
    return (
        <div className={'card ' + cardStyleColor(buildState, 'card')} style={style}>
            <div className={'card-header ' + cardStyleColor(buildState, 'card-header')}>
                <BranchName>#{buildNumber} {buildState} {branchName}</BranchName><CommitMessage>{commitMessage}</CommitMessage>
            </div>
            <div className={'card-body'}>
                {'Test test test'}
            </div>
        </div>
    )
}

export default Card
