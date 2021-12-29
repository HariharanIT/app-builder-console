import React, {useContext} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {useRouter} from 'next/router';
import {useMutation} from '@apollo/client';
import {FormControl, Select, Button} from '@material-ui/core';
import Link from '../common/Link';
// import { createProjectData  } from '../config/PerformAPI';
import {createNewProjectMutation} from '../../graphql/mutations';
import ApiStatusContext from '../contexts/APIContext';
import {useEffect} from 'react';

const useDialogStyles = makeStyles(() =>
  createStyles({
    DialogConatiner: {
      ['@media (max-width:800px)']: {
        padding: '15% 15%',
      },
    },
    caption: {
      fontWeight: 'bold',
      fontSize: '40px',
      textAlign: 'center',
    },
    caption2: {
      fontWeight: 'normal',
      fontSize: '24px',
      marginTop: '0px',
    },
    formControl: {
      width: '100%',
      borderColor: 'gray',
      marginTop: '15px',
      marginBottom: '32px',
    },
    nextButton: {
      width: '100%',
      color: '#fff',
    },
    validation: {
      color: '#CF4040',
      fontSize: '20px',
      fontWeight: 400,
      marginBottom: '20px',
    },
  }),
);

const template: string[] = [
  'Education - Coming Soon',
  'Virtual Event - Coming Later',
  'Watch Party - Coming Later',
];

interface IProjectModal {
  handleClose: () => void;
  isOpen: boolean;
}
const NewProjectModal = ({handleClose, isOpen}: IProjectModal) => {
  const DialogClasses = useDialogStyles();
  const router = useRouter();
  const [validation, setValidation] = React.useState<boolean>(false);
  const [projectName, setProjectName] = React.useState<string>('');
  const [projectTemplate, setProjectTemplate] =
    React.useState<string>('MEETING');
  const {setLoading, setAPIError} = useContext(ApiStatusContext);
  const [createNewProject, {data, loading, error}] = useMutation(
    createNewProjectMutation,
  );
  React.useEffect(() => {
    if (loading) {
      setLoading(true);
    }
    if (error) {
      setAPIError(error.message);
      setLoading(false);
    }
  }, [loading, error, setLoading, setAPIError]);

  useEffect(() => {
    if (data) {
      const {createProject} = data;
      setLoading(false);
      router.push(`/builder?id=${createProject.id}`);
    }
  }, [data, setLoading, router]);
  const handleCreateNewProject = () => {
    if (projectName === '') {
      setValidation(true);
      return;
    }
    createNewProject({
      variables: {
        product_name: projectName,
        preset: projectTemplate,
      },
    });
  };
  return (
    <Dialog onClose={handleClose} open={isOpen} maxWidth="lg">
      <Box py={20} px={20} className={DialogClasses.DialogConatiner}>
        <Box component="div" mb={15}>
          <Typography
            variant="caption"
            className={DialogClasses.caption}
            component="h1">
            Name your project
          </Typography>
          <Typography
            variant="caption"
            className={DialogClasses.caption2}
            component="h1">
            Tell us a little about what you’re trying to build
          </Typography>
        </Box>
        <Box>
          <Box fontSize={14} fontWeight="fontWeightBold">
            Product Name
          </Box>
          <TextField
            error={validation}
            className={DialogClasses.formControl}
            id="outlined-basic"
            label="Enter Your Product Name"
            variant="outlined"
            value={projectName}
            onChange={(event) => {
              setProjectName(event.target.value);
              if (/^$|^[A-Za-z0-9 ]+$/.test(event.target.value)) {
                setValidation(false);
              } else {
                setValidation(true);
              }
            }}
            name={'Product_Name'}
            helperText={
              validation
                ? 'Please enter a valid name with alpha numeric only.'
                : ''
            }
          />
          <Box fontSize={14} fontWeight="fontWeightBold">
            Project Template
          </Box>
          <FormControl variant="outlined" className={DialogClasses.formControl}>
            <Select
              native
              onChange={(event) => {
                if (typeof event.target.value === 'string') {
                  setProjectTemplate(event.target.value);
                }
              }}
              value={projectTemplate}
              name="Project_Template">
              <option value="MEETING">Video Meetings</option>
              {template.map((value, index) => (
                <option value={value} key={index} disabled>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>
        <p>
          By creating a project you are agreeing to the{' '}
          <Link style={{color: '#079dfd'}} href={'/license'}>
            {' '}
            terms and conditions
          </Link>
        </p>
        <Button
          variant="contained"
          color="primary"
          disabled={validation}
          className={DialogClasses.nextButton}
          disableElevation
          onClick={handleCreateNewProject}>
          <Box fontSize={16}>Next</Box>
        </Button>
      </Box>
    </Dialog>
  );
};

export default NewProjectModal;
