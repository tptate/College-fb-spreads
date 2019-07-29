const React = require('react');
const { render } = require('react-dom');

class StorePicker extends React.Component {
  render() {
    return <p> I am the store picker!</p>
  }
};

render(<StorePicker />, document.querySelector('#main'));