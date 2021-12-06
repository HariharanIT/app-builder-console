import {mount, shallow} from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {act} from '@testing-library/react';
import DeployDilog from '../components/appdeploy/DeployDilog';
import {Dialog, Button,LinearProgress} from '@material-ui/core'
describe('DeployDilog tests', () => {
  const mockFnhandleDialogClose = jest.fn();
  it('should check render successfull or not', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'',
        id:''
    }
    await act(async () => {
        wrapper = mount(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus=""
           vercelUploadState=""
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Dialog)).toHaveLength(1);
     expect(wrapper.find(Dialog).at(0).props().open).toEqual(true);
  });
  it('Heroku state pending, vercel and go to app btn disabled', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="pending"
           vercelUploadState=""
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(3);
     expect(wrapper.find(LinearProgress)).toHaveLength(1);
     expect(wrapper.find(Button).at(1).props().disabled).toEqual(true);
     expect(wrapper.find(Button).at(2).props().disabled).toEqual(true);
  });
  it('Heroku state Failed', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="failed"
           vercelUploadState=""
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(4);
     expect(wrapper.find(LinearProgress)).toHaveLength(0);
  });
  it('Heroku state success', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="succeeded"
           vercelUploadState=""
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(5);
     expect(wrapper.find(LinearProgress)).toHaveLength(0);
  });
  it('vercel state pending, heroku status succeeded backend url', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'https://',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="succeeded"
           vercelUploadState="pending"
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(5);
     expect(wrapper.find(LinearProgress)).toHaveLength(1);
     expect(wrapper.find(Button).at(4).props().disabled).toEqual(true);
  });
  it('vercel state Failed', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'https://',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="succeeded"
           vercelUploadState="failed"
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(6);
     expect(wrapper.find(LinearProgress)).toHaveLength(0);
  });
  it('vercel state succeedd', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'',
        app_backend_url:'https://',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="succeeded"
           vercelUploadState="succeeded"
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(7);
     expect(wrapper.find(LinearProgress)).toHaveLength(0);
  });
  it('get frontend and backend url with success status', async () => {
    let wrapper: any;
    let value = {
        app_frontend_url:'https://',
        app_backend_url:'https://',
        id:''
    }
    await act(async () => {
        wrapper = shallow(
         <DeployDilog
            value={value}
           handleDialogClose={mockFnhandleDialogClose}
           openDialog={true}
           allowedDeploy={true}
           herokuUploadStatus="succeeded"
           vercelUploadState="succeeded"
           saveBtn="saved"
         />,
       );
     });
     wrapper.update();
     expect(wrapper.find(Button)).toHaveLength(7);
     expect(wrapper.find(LinearProgress)).toHaveLength(0);
     expect(wrapper.find(Button).at(6).props().disabled).toEqual(false);
  });
});
