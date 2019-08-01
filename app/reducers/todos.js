import * as ActionTypes from '../constants/ActionTypes';

const initialState = [
  {
    id: 0,
    text: 'i love babbel',
    selector: 'p.intro',
    url: 'www.babbel.com',
    created_at: '2019-08-01',
    metadata: {
      'og:lang': 'en',
      'og:title': 'babbel blog',
      'og:image': 'babbel.jpg'
    },
    completed: false,
    displayData: false
  },
  {
    id: 1,
    text: 'i love languages',
    selector: 'p.intro',
    url: 'www.languages.com',
    created_at: '2019-08-01',
    metadata: {
      'og:lang': 'en',
      'og:title': 'languages blog',
      'og:image': 'languages.jpg'
    },
    completed: false,
    displayData: false
  },
  {
    id: 2,
    text: 'i love peanuts',
    selector: 'p.intro',
    url: 'www.peanuts.com',
    created_at: '2019-08-01',
    metadata: {
      'og:lang': 'en',
      'og:title': 'peanuts blog',
      'og:image': 'peanuts.jpg'
    },
    completed: false,
    displayData: false
  },
  {
    id: 3,
    text: 'i love unicorns',
    selector: 'p.intro',
    url: 'www.unicorns.com',
    created_at: '2019-08-01',
    metadata: {
      'og:lang': 'en',
      'og:title': 'unicorns blog',
      'og:image': 'unicorns.jpg'
    },
    completed: false,
    displayData: false
  }
];

const actionsMap = {
  [ActionTypes.ADD_TODO](state, action) {
    return [
      {
        id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: action.text
      },
      ...state
    ];
  },
  [ActionTypes.TOGGLE_DATA_DISPLAY](state, action) {
    return state.map(todo =>
      todo.id === action.id
        ? Object.assign({}, todo, { displayData: !todo.displayData })
        : todo
    );
  },
  [ActionTypes.DELETE_TODO](state, action) {
    return state.filter(todo => todo.id !== action.id);
  },
  [ActionTypes.EDIT_TODO](state, action) {
    return state.map(todo =>
      todo.id === action.id
        ? Object.assign({}, todo, { text: action.text })
        : todo
    );
  },
  [ActionTypes.COMPLETE_TODO](state, action) {
    return state.map(todo =>
      todo.id === action.id
        ? Object.assign({}, todo, { completed: !todo.completed })
        : todo
    );
  },
  [ActionTypes.COMPLETE_ALL](state /*, action*/) {
    const areAllCompleted = state.every(todo => todo.completed);
    return state.map(todo =>
      Object.assign({}, todo, {
        completed: !areAllCompleted
      })
    );
  },
  [ActionTypes.CLEAR_COMPLETED](state /*, action*/) {
    return state.filter(todo => todo.completed === false);
  }
};

export default function todos(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
