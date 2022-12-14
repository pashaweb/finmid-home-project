/** @jest-environment jsdom */

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { IGameData } from './store/store';
import '@testing-library/jest-dom/extend-expect';

const gameData1: IGameData = {
  source_language: "cn",
  word: "natus",
  character_grid: [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ],
  word_locations: {
    "0,0,1,1,2,2":"aei",
  },
  target_language: "javascript"
}



describe('App and fails to load data', () => {

  afterEach(() => {    
    jest.clearAllMocks();
  });


  it('renders app and data succses', async () => {
    //@ts-ignore
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ 
      text: () => Promise.resolve(JSON.stringify(gameData1) + '\n' ) 
    }));
      const {container} = render(<App />);
      const gameStatsRendered = await screen.findByText(/Total Games: 1/i);
      expect(gameStatsRendered).toBeInTheDocument();
      const gameWon = await screen.findByText(/Games Won: 0/i);
      expect(gameWon).toBeInTheDocument();
      const currentGameNumber = await screen.findByText(/Current Game: 1/i);
      expect(currentGameNumber).toBeInTheDocument();
      const word = await screen.findByText(/Word: natus/i);
      expect(word).toBeInTheDocument();
      const grid = container.querySelector('.game-grid-container');
      expect(grid).toBeInTheDocument();
      expect(grid?.children.length).toBe(9);
  });


});
