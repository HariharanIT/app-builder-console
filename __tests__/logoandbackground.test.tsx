import {shallow} from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {act} from '@testing-library/react';
import LogoBackground from '../components/Appcontrols/LogoBackground';
import Upload from '../components/Appcontrols/Upload';
export type LogoType = 'logoRect' | 'logoSquare' | 'illustration' | 'bg';
export type LogoStateType = File | null;
describe('Logo and background Tests', () => {
    const mockFnonClickBack = jest.fn() as VoidFunction;
    const mockFnhandleUpload = jest.fn() as (file: LogoStateType, name: LogoType) => void;
  it('should Logo and background components render successfull or not', async () => {
    let wrapper: any;
    let value:any = {
        logoRect:'',
        logoSquare:'',
        bg:''
    }
    await act(async () => {
      wrapper = shallow(<LogoBackground onClickBack={mockFnonClickBack} handleUpload={mockFnhandleUpload} value={value}/>);
    });
    wrapper.update();
    expect(wrapper.find(Upload)).toHaveLength(3);
  });
  it('Check value', async () => {
    let wrapper: any;
    let value:any = {
        logoRect:'test-logoRect',
        logoSquare:'test-logoSquare',
        bg:'test-bg'
    }
    await act(async () => {
      wrapper = shallow(<LogoBackground onClickBack={mockFnonClickBack} handleUpload={mockFnhandleUpload} value={value}/>);
    });
    wrapper.update();
    expect(wrapper.find(Upload).at(0).props().value).toEqual('test-logoRect');   
    expect(wrapper.find(Upload).at(1).props().value).toEqual('test-logoSquare');
    expect(wrapper.find(Upload).at(2).props().value).toEqual('test-bg');
  });
});