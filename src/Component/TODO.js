import React,{useState} from 'react'
import './Todo.css';
import { motion } from 'framer-motion';

export default function TODO() {

const addlist = () =>{
    
}

  return (
    <div className='ot-container'>
        <motion.button className='btn' whileTap={{scale:0.9}} whileHover={{scale:1.1}} >
            +
       </motion.button>
    <div className="todo-list">
        {/* Todo items will be added here */}
        {/* <div className="todo-item">
            <input type="checkbox" id="task1" name="task" />
            <label for="task1">Task 1</label>
        </div>
        <div className="todo-item">
            <input type="checkbox" id="task2" name="task" />
            <label for="task2">Task 2</label>
        </div>
        <div className="todo-item">
            <input type="checkbox" id="task3" name="task" />
            <label for="task3">Task 3</label>
        </div> */}
        
    </div>
    </div>
  )
}
