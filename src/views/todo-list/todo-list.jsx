import React from 'react';
import { Card } from '../../components/card';
import './todo-list.scss'
import { Input } from '../../components/input';
import { ItemList } from '../../components/item-list';
import { Check } from '../../components/check';
import { Button } from '../../components/button';

const TodoList = props =>{

  const {
    list,
    filter,
    textAdd,
    filterClass,
    showAdd,
    showFilter,
    handleClick,
    handleChange,
    handleChangeFilterClass,
    handleShowInputs,
    handleKeyPress
  } = props;

  const listFilter = filter !== '' ? list.filter(e => e.text.toLowerCase().includes(filter.toLowerCase())) : list;

  const validateClass = (item) =>{
    if(filterClass.all) return 'show-item';
    if(filterClass.active && !item.active) return 'show-item'
    if(filterClass.completed && item.active) return 'show-item' 
    return 'display-none'
  }

  return(
    <div className='container-list'>
      <Card>
        {
          showAdd && <Input placeholder='Add new' value={textAdd} onChange={(e) => handleChange(e.target.value, 'add')} onKeyDown={(e) => handleKeyPress(e)}></Input>
        }
        {
          showFilter && <Input placeholder='Search' value={filter} onChange={(e) => handleChange(e.target.value, 'filter')} ></Input>
        }
        <br/>
        <ul>
          {
            listFilter.map((element, i) =>{
              return <ItemList key={i} className={`${validateClass(element)}`} > 
                <Check type="checkbox" value={element.active} onClick={(e) => handleClick(i, e.target.checked)} ></Check>
                {element.text}
              </ItemList>
            })
          }
        </ul>
        <footer>
          <div>
            <Button onClick={() => handleShowInputs('add')} active={showAdd}>+</Button>
            <Button onClick={() => handleShowInputs('filter')} active={showFilter}>filter</Button>
          </div>
          <div>
            <Button onClick={() => handleChangeFilterClass('all')} active={filterClass.all}>All</Button>
            <Button onClick={() => handleChangeFilterClass('active')} active={filterClass.active}>Active</Button>
            <Button onClick={() => handleChangeFilterClass('completed')} active={filterClass.completed}>Comleted</Button>
          </div>
          <div className='length-items'>
            {`${list.length} Items`}
          </div>
        </footer>
      </Card>
    </div>
  )
}
export default TodoList;
