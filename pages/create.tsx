import React from 'react';
import Navbar from '../components/Navbar';
import Projects from '../components/projects/Projects';
import ProjectTemplates from '../components/projects/ProjectTemplates';
import NewProjectModal from '../components/projects/NewProjectModal';
import ProjectBanner from '../components/projects/ProjectBanner';

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        flexGrow: 1,
        fontFamily: 'acumin-pro, sans-serif',
        fontStyle: 'normal',
      }}>
      <Navbar />
      <ProjectBanner />
      <Projects handleCreateNewProject={handleClickOpen} />
      <ProjectTemplates handleCreateNewProject={handleClickOpen} />
      <NewProjectModal handleClose={handleClose} isOpen={open} />
    </div>
  );
}
