import {mount} from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {act} from '@testing-library/react';
import ColorFont from '../components/Appcontrols/ColorFont';
import {TextField} from '@material-ui/core'
describe('ColorFont tests',()=>{
    let wrapper: any;
    const mockFnonClickBack = jest.fn();
    const mockFnhandleColorChange = jest.fn();
    const mockFnhandleValueChange = jest.fn();
    beforeEach(async () => {
        const colorValue = {
            primaryColor:"red"
        }
        await act(async () => {
          wrapper = mount(<ColorFont onClickBack={mockFnonClickBack} handleColorChange={mockFnhandleColorChange} handleValueChange={mockFnhandleValueChange} value={colorValue}/>);
        });
      });
    it('Should Click on Color Change',async ()=>{
        const event = {
            target: { value: "red",name:"primaryColor"}
          } as React.ChangeEvent<HTMLInputElement>;
        await act(async () => {
            await wrapper.find(TextField).props().onChange(event);
        });
        wrapper.update();
        expect(mockFnhandleValueChange).toBeCalledWith(event);
    })
})