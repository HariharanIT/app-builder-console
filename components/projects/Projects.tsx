import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {useQuery} from '@apollo/client';
import {projectListQuery} from '../../graphql/queries';
import ApiStatusContext from '../contexts/APIContext';
import ProjectCard from './ProjectCard';
export interface IProjectMeta {
  id: string;
  product_name: string;
  created_at: string;
  primary_font_color: string;
  landing_sub_heading: string;
  primary_color: string;
  primary_background_logo: File | null | string;
  primary_logo: File | null | string;
}

export interface IProjects {
  projectList: IProjectMeta[];
  handleDeleteProject: (e: React.MouseEvent<HTMLElement>, id: string) => void;
  handleCreateNewProject: (e: React.MouseEvent<HTMLElement>) => void;
}
export const useProjectStyles = makeStyles(() =>
  createStyles({
    Project: {
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '200px',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F9F9F9',
      border: '2px dashed #BCBCBC',
      outline: 'none',
      cursor: 'pointer',
    },
    NewProject: {
      width: '53px',
    },
    ProjectCaption: {
      fontWeight: 'bold',
      fontSize: '14px',
      marginTop: '35px',
    },
    ProjectGrid: {
      width: '25%',
      padding: '10px 20px 10px 20px !important',
      ['@media (max-width:500px)']: {
        width: '100%',
      },
      ['@media (max-width:850px) and (min-width:500px)']: {
        width: '50%',
      },
    },
  }),
);

const Projects = ({
  handleCreateNewProject,
}: {
  handleCreateNewProject: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  const ProjectClasses = useProjectStyles();
  const [projectList, setProjectList] = React.useState<any>([]);
  const {setLoading, setAPIError} = useContext(ApiStatusContext);
  const {loading, error, data} = useQuery(projectListQuery());
  React.useEffect(() => {
    if (data) {
      setProjectList(data.projects);
      setLoading(false);
      setAPIError('');
    }
  }, [data, setProjectList, setLoading, setAPIError]);

  React.useEffect(() => {
    if (loading) {
      setLoading(true);
    }
    if (error) {
      setAPIError(error.message);
    }
  }, [loading, error, setLoading, setAPIError]);
  return (
    <Box mt={30}>
      <Box position="relative" px={30}>
        <Grid container xs={12} item={true} id="list">
          <Grid item className={ProjectClasses.ProjectGrid}>
            <Card
              onClick={handleCreateNewProject}
              className={ProjectClasses.Project}>
              <img className={ProjectClasses.NewProject} src="./ADD.png" />
              <Typography
                variant="caption"
                className={ProjectClasses.ProjectCaption}
                component="h1">
                New Project
              </Typography>
            </Card>
          </Grid>
          {projectList &&
            projectList.map((project: any, index: number) => (
              <ProjectCard
                {...project}
                // update/remove after the discussion
                handleDeleteProject={() => console.log('deleting project')}
                key={index}
              />
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
export default Projects;
