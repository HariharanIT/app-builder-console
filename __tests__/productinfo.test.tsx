import {mount, shallow} from 'enzyme';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {act} from '@testing-library/react';
import ProductInfo from '../components/appcontrols/ProductInfo';
import {TextField,TextareaAutosize} from '@material-ui/core';

describe('ProductInfo Tests', () => {
const mockFnonClickBack = jest.fn() as VoidFunction;
const mockFnhandleValueChange = jest.fn();
const mockFnsetErrorHandler = jest.fn();
  it('should ProductInfo components render successfull or not', async () => {
    let wrapper: any;
    let value:any = {
        HEADING:'',
        Product_id:'',
        SUBHEADING:''
    }
    let errorHandler = {
        ProductInformation:{
            ProductName:'',
            ProductId:'',
            ProductDesc:''
        }
    }
    await act(async () => {
      wrapper = shallow(<ProductInfo projectIdEnable={true} setErrorHandler={mockFnsetErrorHandler} onClickBack={mockFnonClickBack} value={value} handleValueChange={mockFnhandleValueChange} errorHandler={errorHandler}/>);
    });
    wrapper.update();
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(TextareaAutosize)).toHaveLength(1);
    expect(wrapper.find(TextField).at(1).props().disabled).toEqual(false);
  });
  it('Value change in components', async () => {
    let wrapper: any;
    let value:any = {
        HEADING:'abc123',
        Product_id:'abc123',
        SUBHEADING:'abc123'
    }
    let errorHandler = {
        ProductInformation:{
            ProductName:'',
            ProductId:'',
            ProductDesc:''
        }
    }
    await act(async () => {
      wrapper = shallow(<ProductInfo projectIdEnable={true} setErrorHandler={mockFnsetErrorHandler} onClickBack={mockFnonClickBack} value={value} handleValueChange={mockFnhandleValueChange} errorHandler={errorHandler}/>);
    });
    wrapper.update();
    await act(async () => {
        await wrapper.find(TextField).at(0).props().onChange({target: {name:'HEADING',value: 'abc123'}});
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalledWith({target: {name:'HEADING',value: 'abc123'}});
    await act(async () => {
        await wrapper.find(TextField).at(1).props().onChange({target: {name:'Product_id',value: 'abc123'}});
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalledWith({target: {name:'Product_id',value: 'abc123'}});
    await act(async () => {
        await wrapper.find(TextareaAutosize).at(0).props().onChange({target: {name:'SUBHEADING',value: 'abc123'}});
    });
    wrapper.update();
    expect(mockFnhandleValueChange).toBeCalledWith({target: {name:'SUBHEADING',value: 'abc123'}});
    expect(wrapper.find(TextField).at(0).props().value).toEqual('abc123');
    expect(wrapper.find(TextField).at(1).props().value).toEqual('abc123');
    expect(wrapper.find(TextareaAutosize).at(0).props().value).toEqual('abc123');
  });
  it('Error handling components', async () => {
    let wrapper: any;
    let value:any = {
        HEADING:'',
        Product_id:'',
        SUBHEADING:''
    }
    let errorHandler = {
        ProductInformation:{
            ProductName:'Product Name Should alphabetical ,numerical value and reserved keywords are not allowed.',
            ProductId:'Product ID is required field',
            ProductDesc:'Product Description is required field'
        }
    }
    await act(async () => {
      wrapper = mount(<ProductInfo projectIdEnable={true} setErrorHandler={mockFnsetErrorHandler} onClickBack={mockFnonClickBack} value={value} handleValueChange={mockFnhandleValueChange} errorHandler={errorHandler}/>);
    });
    wrapper.update();
    expect(wrapper.find(TextField).at(0).props().error).toEqual(true);
    expect(wrapper.find(TextField).at(0).props().helperText).toEqual('Product Name Should alphabetical ,numerical value and reserved keywords are not allowed.');
    expect(wrapper.find(TextField).at(1).props().error).toEqual(true);
    expect(wrapper.find(TextField).at(1).props().helperText).toEqual('Product ID is required field');
    expect(wrapper.find(TextareaAutosize).at(0).props().style.border).toEqual('1px solid #ff1744');
  });
});