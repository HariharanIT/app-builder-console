import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useRouter} from 'next/router';
import moment from 'moment';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import ProjectMenus from '../MenuBox';
import {LivePreviewSVG, getImageUrl} from '../Livepreview/LivePreviewContent';
import {IProjectMeta} from './Projects';
export interface IProject extends IProjectMeta {
  handleDeleteProject: (e: React.MouseEvent<HTMLElement>, id: string) => void;
}

export const useCardStyles = makeStyles(() =>
  createStyles({
    CardGrid: {
      width: '25%',
      padding: '10px 20px 10px 20px !important',
      ['@media (max-width:500px)']: {
        width: '100%',
      },
      ['@media (max-width:850px) and (min-width:500px)']: {
        width: '50%',
      },
    },
    media: {
      borderRadius: '4px',
      paddingTop: '56.25%',
    },
    caption2: {
      fontWeight: 'bold',
      fontSize: '16px',
    },
    caption3: {
      fontWeight: 'normal',
      fontSize: '14px',
      marginTop: '15px',
    },
  }),
);

const ProjectCard = ({
  id,
  product_name,
  created_at,
  primary_font_color,
  landing_sub_heading,
  primary_color,
  primary_background_logo,
  primary_logo,
  handleDeleteProject,
}: IProject) => {
  const router = useRouter();
  const CardClasses = useCardStyles();
  const backgroundLogoUrl = getImageUrl(primary_background_logo);
  const primaryLogoUrl = getImageUrl(primary_logo);
  return (
    <Grid className={CardClasses.CardGrid}>
      <Card
        style={{
          borderRadius: '10px',
          cursor: 'pointer',
          height: '100%',
          position: 'relative',
        }}
        onClick={() => {
          router.push(`/builder?id=${id}`);
        }}>
        <Card style={{margin: '15px'}}>
          <LivePreviewSVG
            backgroundLogoUrl={backgroundLogoUrl}
            primaryLogoUrl={primaryLogoUrl}
            primary_font_color={primary_font_color}
            landing_sub_heading={landing_sub_heading}
            primary_color={primary_color}
            product_name={product_name}
            isLivePreview={false}
          />
          {/* <CardMedia className={CardClasses.media} image="./cardimg.png" /> */}
        </Card>
        <CardContent>
          <Typography
            variant="caption"
            className={CardClasses.caption2}
            component="h1">
            {product_name}
          </Typography>
          <Typography
            variant="caption"
            className={CardClasses.caption3}
            component="p">
            {moment(created_at).format('MMM DD, yyyy')}
          </Typography>
        </CardContent>
        <Box position="absolute" right="10px" top="10px">
          <ProjectMenus
            deleteAction={(e: any) => {
              handleDeleteProject(e, id);
            }}
          />
        </Box>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
