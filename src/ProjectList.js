import React from 'react';
import PropTypes from 'prop-types'
import uniqid from 'uniqid';

function ProjectList(props) {
  const { projects } = props;
  return (
    <div className='project-list'>
      {projects.map((o) => <img className='card' src={o.img} alt='' key={uniqid()}/>)}
    </div>
  );
}

export default ProjectList;

ProjectList.propTypes = {
  projects: PropTypes.array.isRequired,
}
