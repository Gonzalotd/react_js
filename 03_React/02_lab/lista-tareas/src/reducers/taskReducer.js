export const taskReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [...state.tasks, {
            id: Date.now(),
            text: action.payload,
            completed: false
          }]
        };
      
      case 'TOGGLE_TASK':
        return {
          ...state,
          tasks: state.tasks.map(task =>
            task.id === action.payload
              ? { ...task, completed: !task.completed }
              : task
          )
        };
      
      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload)
        };
      
      case 'LOAD_TASKS':
        return {
          ...state,
          tasks: action.payload || []
        };
      
      default:
        return state;
    }
  };
  
  export const initialState = {
    tasks: []
  };