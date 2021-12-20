import React from 'react';
import Navbar from '../components/Navbar';
import Projects from '../components/projects/Projects';
import ProjectTemplates from '../components/projects/ProjectTemplates';
import NewProjectModal from '../components/projects/NewProjectModal';
import ProjectBanner from '../components/projects/ProjectBanner';

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState<any>('');
  const handleClickOpen = (value?: string) => {
    setSelectedTemplate(value);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedTemplate('');
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
      <NewProjectModal
        selectedTemplate={selectedTemplate}
        handleClose={handleClose}
        isOpen={open}
      />
    </div>
  );
}
