import React, {useState} from 'react';
import './App.scss';
import { BodyContainer } from './components/body-container';
import { Title } from './components/title';
import TodoList from './views/todo-list/todo-list';
import ItemModel from './model/item.model';

function App() {
  const [states, setStates] = useState({
    list:[
      new ItemModel({text: 'Learn Javascript'}),
      new ItemModel({text: 'Learn React'}),
    ],
    filter: '',
    textAdd: '',
    filterClass: {
      all: true,
      active:false,
      completed:false
    },
    showAdd:true,
    showFilter:false
  });

  const handleClick = (index, active) =>{
    let list = [...states.list];
    list[index].active = active;
    setStates({...states, list});
  }

  const handleKeyPress = (event) =>{
    if(event.keyCode === 13){
      setStates({...states, list: [...states.list, new ItemModel({text: states.textAdd})], textAdd: '' })
    }
  }

  const handleChange = (text, type) =>{
    if(type === 'filter'){
      setStates({...states, filter: text})
    }
    else
      setStates({...states, textAdd: text})
  }

  const handleChangeFilterClass = (activeClass) =>{
    let {filterClass} = states;
    for (const key in filterClass) {
      if (filterClass.hasOwnProperty(key)) filterClass[key] = false;
    }
    setStates({...states, filterClass: {...filterClass, [activeClass]: true}})
  }

  const handleShowInputs = (type) =>{
    let {showAdd, showFilter} = states;

    switch (type) {
      case 'add':
        showAdd = !showAdd;
        if(showAdd) showFilter = false;
        break;
      case 'filter':
        showFilter = !showFilter;
        if(showFilter) showAdd = false;
        break; 
      default:
        break;
    }

    setStates({...states, showAdd, showFilter, textAdd: '', filter: ''})
  }

  return (
    <BodyContainer>
      <Title>THINGS TO DO</Title>
      <TodoList 
        {...states}
        handleClick={handleClick}
        handleChange={handleChange}
        handleKeyPress={handleKeyPress}
        handleChangeFilterClass={handleChangeFilterClass}
        handleShowInputs={handleShowInputs}
      />
    </BodyContainer>
  );
}

export default App;
