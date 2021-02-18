import 'date-fns';
import React, {Component, Fragment} from 'react';
import {TodoList} from "./TodoList";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';


export class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = {items: [], text: '', priority: 0, selectedDate: moment(), dueDate: moment().format("YYYY-MM-DD")};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return (
                <Fragment>
            <div className="TodoApp">
                
                <form onSubmit={this.handleSubmit} className="todo-form">
                    <h3>New TODO</h3>
                  
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="component-outlined">Text</InputLabel>
                        <OutlinedInput id="component-outlined" value={this.state.text} onChange={this.handleTextChange} label="Text" />
                    </FormControl>

                    <br/>
                    <br/>
                   
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="component-outlined">Priority</InputLabel>
                        <OutlinedInput 
                            id="component-outlined" 
                            type="number"
                            value={this.state.priority} 
                            onChange={this.handlePriorityChange} 
                            label="Priority" />
                    </FormControl>

                    <br/>
                    <br/>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            label="With keyboard"
                            value={this.state.selectedDate}
                            format="YYYY-MM-DD"
                            inputValue={this.state.dueDate}
                            onChange={this.handleDateChange}
                            InputAdornmentProps={{ position: "start" }}
                        />
                    </MuiPickersUtilsProvider>


                    <br/>
                   <Button 
                    variant="contained" 
                    color="primary" 
                    component="span"
                    onClick={this.handleSubmit}
                   >
                    Add #{this.state.items.length + 1}
                    </Button>
                </form>
                <br/>
                <br/>
                <TodoList todoList={this.state.items}/>
             </div>  
             </Fragment>
        );
    }

    handleTextChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    handlePriorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }

    handleDateChange(date, value) {
        this.setState({
            selectedDate: date
        });
        
        this.setState({
            dueDate: value
        });

    }

    handleSubmit(e) {

        e.preventDefault();

        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate)
            return;

        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate,

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: moment().format("YYYY-MM-DD"),
            selectedDate:  moment()
        }));
    }


}