import styles from './App.css';
import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <section className={styles.row}>
        <div className={styles.quarter}>1</div>
        <div className={styles.half}>2 column</div>
        <div className={styles.quarter}>3</div>
      </section>
    );
  }
}
