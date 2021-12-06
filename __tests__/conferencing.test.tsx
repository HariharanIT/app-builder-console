import {mount} from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {act} from '@testing-library/react';
import Conferencing from '../components/appcontrols/Conferencing';
import {Switch,TextField} from '@material-ui/core'
describe('conferencing tests', () => {
  let wrapper: any;
  const mockFnonClickBack = jest.fn();
  const mockFnhandleValueChange = jest.fn();
  const mockFnsetErrorHandler = jest.fn();
  beforeEach(async () => {
    const value: any = {
      pstn: true,
      precall: true,
      chat: true,
      cloudRecording: true,
      screenSharing: true,
      encryption:true,
      BUCKET_NAME: '',
      BUCKET_ACCESS_KEY: '',
      BUCKET_ACCESS_SECRET: '',
      CLIENT_ID: '',
      CLIENT_SECRET: '',
      REDIRECT_URL: '',
      PSTN_USERNAME: '',
      PSTN_PASSWORD: '',
    };
    let errorHandler = {
      ConferencingScreen: {
        PSTN: {
          TId: '',
          TPassword: '',
        },
        Cloud: {
          CustomerID: '',
          CustomerCertificate: '',
          BucketName: '',
          BucketAccessKey: '',
          BucketAccessSecret: '',
        },
      }
    }
    await act(async () => {
      wrapper = mount(
        <Conferencing
          value={value}
          setErrorHandler={mockFnsetErrorHandler}
          errorHandler={errorHandler}
          onClickBack={mockFnonClickBack}
          handleValueChange={mockFnhandleValueChange}
        />,
      );
    });
  });

  it('should switch working proper', async () => {
    expect(wrapper.find(Switch)).toHaveLength(6)
    expect(wrapper.find(Switch).at(0).props().checked).toEqual(true);
    expect(wrapper.find(Switch).at(1).props().checked).toEqual(true);
    expect(wrapper.find(Switch).at(2).props().checked).toEqual(true);
    expect(wrapper.find(Switch).at(3).props().checked).toEqual(true);
    expect(wrapper.find(Switch).at(4).props().checked).toEqual(true);
    expect(wrapper.find(Switch).at(5).props().checked).toEqual(true);
  });
  it('should Change Event in pstn',async () =>{
    expect(wrapper.find(TextField)).toHaveLength(7);
    let event = {
        target: {
          name:'PSTN_USERNAME',
          value: 'abc 123@',
        }
      } as React.ChangeEvent<HTMLInputElement>;
    await act(async () => {
        await wrapper.find(TextField).at(0).props().onChange(event);
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalledWith(event);
    event = {
        target: {
          name:'PSTN_PASSWORD',
          value: 'abc 123@',
        }
      } as React.ChangeEvent<HTMLInputElement>;
    await act(async () => {
        await wrapper.find(TextField).at(1).props().onChange(event);
    });
    wrapper.update();
  })
  it('should Change Event in pstn',async () =>{
    expect(wrapper.find(TextField)).toHaveLength(7);
    let event = {
        target: {
          name:'PSTN_USERNAME',
          value: 'abc 123@',
        }
      } as React.ChangeEvent<HTMLInputElement>;
    await act(async () => {
        await wrapper.find(TextField).at(0).props().onChange(event);
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalledWith(event);
    event = {
        target: {
          name:'PSTN_PASSWORD',
          value: 'abc 123@',
        }
      } as React.ChangeEvent<HTMLInputElement>;
    await act(async () => {
        await wrapper.find(TextField).at(1).props().onChange(event);
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalledWith(event);
  })
  it('should Change Event in cloudRecording',async () =>{
    expect(wrapper.find(TextField)).toHaveLength(7);
    await act(async () => {
        await wrapper.find(TextField).at(2).props().onChange({target: {name:'CUSTOMER_ID',value: 'abc 123@'}});
    });
    await act(async () => {
        await wrapper.find(TextField).at(3).props().onChange({target: {name:'CUSTOMER_CERTIFICATE',value: 'abc 123@'}});
    });
    await act(async () => {
        await wrapper.find(TextField).at(4).props().onChange({target: {name:'BUCKET_NAME',value: 'abc 123@'}});
    });
    await act(async () => {
        await wrapper.find(TextField).at(5).props().onChange({target: {name:'BUCKET_ACCESS_KEY',value: 'abc 123@'}});
    });
    await act(async () => {
        await wrapper.find(TextField).at(6).props().onChange({target: {name:'BUCKET_ACCESS_SECRET',value: 'abc 123@'}});
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalled();
  })
});
