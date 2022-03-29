import {useReducer, useRef} from 'react';
 
//dispath ở dưới useReducer chính là tham số truyền "action" truyền vào const reducer
const initState = {
    jod: '',
    jods: []
};

//2.contant
const SET = "set";
const ADD = "add_job";
const REMOVE = "remove_job";

//3.action
const setJob = payload => {
    return {
        payload: payload,
        type: SET,
    }
}

const addJob = payload => {
    return {
        payload: payload,
        type: ADD,
    }
}

const deleteJob = payload => {
    return {
        payload: payload,
        type: REMOVE
    }
}

// reducer phải trả ra đúng format initState  
const reducer = (state, action) =>{
    console.log(action);  //chính là giá trị dispath ở dưới  useReducer
    console.log(action.payload)
    switch(action.type) {
        case SET:
            return {
                ...state,
                jod:action.payload
            }
        case ADD:
            return {
                ...state,
                jod:'',                   //reset input c1
                jods:[...state.jods,action.payload]
            }
            case REMOVE:
                const newArray = [...state.jods];       //bảo toàn state ko component render;
                console.log("id rm"+action.payload)
                newArray.splice(action.payload,1);
                return {
                    ...state,
                    jods:newArray
                }
        default:
            throw new Error("Invalid action")
    }

}



function ToDoList() {
    const [state, dispath] = useReducer(reducer ,initState)    //state=initState  ;dispath=reducer  
    const inputRef = useRef()

    const {jod, jods} = state
    const handleSubmit = ()=>{
        dispath(addJob(state.jod))
        inputRef.current.focus()
         


    }

    console.log(state);
    return (
        <>
            <input 
                type="text" 
                value={jod}
                ref={inputRef}
                onChange = {e => {
                    return dispath(setJob(e.target.value))
                }}                
            />
            <button onClick ={e =>  handleSubmit()}>Add New</button>
            <ul>
               {
                   jods.map((jod,index) =>(
                    <li key={index}>
                        {jod}
                        <span onClick={() => dispath(deleteJob(index))}>&times;</span>
                    </li>
                   ))
               }
            </ul>
        </>
    )
}

export default ToDoList
