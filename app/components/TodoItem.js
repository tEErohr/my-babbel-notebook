import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import style from './TodoItem.css';
import * as base64 from '../utils/base64';
import { hostFromURL } from '../utils/url';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (text) => {
    const { todo, deleteTodo, editTodo } = this.props;
    if (text.length === 0) {
      deleteTodo(todo.id);
    } else {
      editTodo(todo.id, text);
    }
    this.setState({ editing: false });
  };

  handleComplete = () => {
    const { todo, completeTodo } = this.props;
    completeTodo(todo.id);
  };

  handleDataDisplay = () => {
    const { todo, toggleDataDisplay } = this.props;

    toggleDataDisplay(todo.id, !todo.displayData);

    // deleteTodo(todo.id);
  };

  handleDelete = () => {
    const { todo, deleteTodo } = this.props;
    deleteTodo(todo.id);
  };

  render() {
    const { todo } = this.props;
    const host = hostFromURL(todo.url);

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div>
          <div className={style.view}>
            <img
              width={32}
              height={32}
              alt="site logo"
              src={`http://localhost:9090/fetch?url=${base64.encode(todo.url)}`}
            />
            <label
              className={todo.displayData ? style.rotateMe : null}
              onClick={this.handleDataDisplay}
            >
              {todo.text}
            </label>
          </div>
          <ul
            className={todo.displayData ? style.dataList : style.dataListHidden}
          >
            <li className={style.dataItem}>
              <a target="_blank" rel="noopener noreferrer" href={todo.url}>
                {todo.url}
              </a>
            </li>
            <li className={style.dataItem}>
              {new Date(todo.created_at).toDateString()}
            </li>
          </ul>
          <button className={style.destroy} onClick={this.handleDelete} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style.completed]: todo.completed,
          [style.editing]: this.state.editing,
          [style.normal]: !this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
