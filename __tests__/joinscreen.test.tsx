import {mount} from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {act} from '@testing-library/react';
import JoinScreen from '../components/Appcontrols/JoinScreen';
import {TextField} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
export type LogoType = 'logoRect' | 'logoSquare' | 'illustration' | 'bg';
export type LogoStateType = File | null;
describe('joinScreen Tests', () => {
  const mockFnonClickBack = jest.fn() as VoidFunction;
  const mockFnhandleValueChange = jest.fn();
  const mockFnsetErrorHandler = jest.fn();
  const mockFnhandleUpload = jest.fn() as (file: LogoStateType, name: LogoType) => void;
  const mockFnhandleCheckChange = jest.fn();
  it('Joinscreen render successfully', async () => {
    let wrapper: any;
    let value:any ={
        ENABLE_OAUTH:false,
        illustration:"",
        CLIENT_ID:'',
        CLIENT_SECRET:''
    }
    let errorHandler = {
        JoinScreen:{
            ClientID:"",
            ClientSecret:""
        }
    }
    await act(async () => {
      wrapper = mount(<JoinScreen setErrorHandler={mockFnsetErrorHandler} onClickBack={mockFnonClickBack} handleUpload={mockFnhandleUpload} handleCheckChange={mockFnhandleCheckChange} value={value} handleValueChange={mockFnhandleValueChange} errorHandler={errorHandler}/>);
    });
    wrapper.update();
    expect(wrapper.find(Switch)).toHaveLength(1);
  });
  it('Outh Enabled', async () => {
    let wrapper: any;
    let value:any ={
        ENABLE_OAUTH:true,
        illustration:"",
        CLIENT_ID:'abc123@',
        CLIENT_SECRET:'abc123@'
    }
    let errorHandler = {
        JoinScreen:{
            ClientID:"",
            ClientSecret:""
        }
    }
    await act(async () => {
      wrapper = mount(<JoinScreen setErrorHandler={mockFnsetErrorHandler} onClickBack={mockFnonClickBack} handleUpload={mockFnhandleUpload} handleCheckChange={mockFnhandleCheckChange} value={value} handleValueChange={mockFnhandleValueChange} errorHandler={errorHandler}/>);
    });
    wrapper.update();
    expect(wrapper.find(TextField)).toHaveLength(2);
    await act(async () => {
        await wrapper.find(TextField).at(0).props().onChange({target: {name:'CLIENT_ID',value: 'abc123@'}});
    });
    expect(mockFnhandleValueChange).toBeCalledWith({target: {name:'CLIENT_ID',value: 'abc123@'}});
    await act(async () => {
        await wrapper.find(TextField).at(1).props().onChange({target: {name:'CLIENT_SECRET',value: 'abc123@'}});
    });
    expect(mockFnhandleValueChange).toBeCalledWith({target: {name:'CLIENT_SECRET',value: 'abc123@'}});
    expect(wrapper.find(TextField).at(0).props().value).toEqual('abc123@');
    expect(wrapper.find(TextField).at(1).props().value).toEqual('abc123@');
  });
  it('Error Handling', async () => {
    let wrapper: any;
    let value:any ={
        ENABLE_OAUTH:true,
        illustration:"",
        CLIENT_ID:'',
        CLIENT_SECRET:''
    }
    let errorHandler = {
        JoinScreen:{
            ClientID:"Google oauth client ID  is required field",
            ClientSecret:"Google oauth client secret is required field"
        }
    }
    await act(async () => {
      wrapper = mount(<JoinScreen setErrorHandler={mockFnsetErrorHandler} onClickBack={mockFnonClickBack} handleUpload={mockFnhandleUpload} handleCheckChange={mockFnhandleCheckChange} value={value} handleValueChange={mockFnhandleValueChange} errorHandler={errorHandler}/>);
    });
    wrapper.update();
    expect(wrapper.find(TextField).at(0).props().error).toEqual(true);
    expect(wrapper.find(TextField).at(0).props().helperText).toEqual("Google oauth client ID  is required field");
    expect(wrapper.find(TextField).at(1).props().error).toEqual(true);
    expect(wrapper.find(TextField).at(1).props().helperText).toEqual("Google oauth client secret is required field");
  });
});