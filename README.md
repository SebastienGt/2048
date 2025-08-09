# 2048 Game - React Native Implementation

A fully-featured implementation of the popular 2048 game built with React Native, TypeScript, and Expo.

## 🎮 Features

### Core Game Mechanics

-   ✅ **Initial Board Generation**: Starts with random number of `2`s at random positions
-   ✅ **Four-Direction Movement**: Support for left, right, up, and down merges
-   ✅ **Tile Merging Logic**: Adjacent tiles with same values merge into doubled values
-   ✅ **Score Tracking**: Points awarded for each merge operation
-   ✅ **Random Tile Generation**: New `2` or `4` tiles appear after each valid move
-   ✅ **Win Condition**: Game detects when player reaches 2048
-   ✅ **Game Over Detection**: Automatically detects when no more moves are possible

### Enhanced User Experience

-   🎨 **Beautiful UI**: Authentic 2048 design with smooth animations
-   📱 **Touch Gestures**: Intuitive swipe controls for movement
-   🔄 **Undo Functionality**: Allows players to undo their last move
-   🏆 **Best Score Tracking**: Persistent high score tracking
-   🎯 **Game State Management**: Professional state management with React hooks
-   📊 **Real-time Feedback**: Immediate visual feedback for all actions

## 🏗️ Architecture

### Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── GameBoard.tsx    # Main 4x4 game grid
│   ├── Tile.tsx         # Individual tile component with animations
│   ├── ScoreBoard.tsx   # Score and best score display
│   ├── GameControls.tsx # New Game and Undo buttons
│   └── GameModal.tsx    # Win/Game Over modal
├── hooks/               # Custom React hooks
│   ├── useGame.ts       # Game state management
│   └── useGestures.ts   # Touch gesture handling
├── types/               # TypeScript type definitions
│   └── game.ts          # Game-related types and constants
├── utils/               # Pure utility functions
│   └── gameLogic.ts     # Core game logic (board operations, validation)
└── __tests__/           # Unit tests
    └── gameLogic.test.ts # Tests for core game mechanics
```

### Design Principles

-   **Separation of Concerns**: Clear separation between UI, state management, and business logic
-   **Type Safety**: Full TypeScript implementation with comprehensive type definitions
-   **Functional Programming**: Pure functions for game logic enable easy testing and debugging
-   **Component Composition**: Modular components for maintainability and reusability
-   **Performance Optimization**: Efficient state updates and animation handling

## 🔧 Technical Implementation

### Core Game Logic (`utils/gameLogic.ts`)

The heart of the game implements all the required mechanics:

```typescript
// Board manipulation
export const createEmptyBoard = (): Board
export const generateInitialBoard = (): Board
export const addRandomTile = (board: Board): Board

// Movement and merging
export const moveBoard = (board: Board, direction: Direction): MoveResult

// Game state validation
export const hasValidMoves = (board: Board): boolean
export const hasWinningTile = (board: Board): boolean
```

### State Management (`hooks/useGame.ts`)

Professional React state management handling:

-   Game state with immutable updates
-   Undo functionality with state history
-   Win/loss condition detection
-   Score calculation and persistence

### Gesture System (`hooks/useGestures.ts`)

Touch-based controls using React Native Gesture Handler:

-   Swipe detection with minimum threshold
-   Direction calculation based on gesture vector
-   Prevention of invalid moves during game over

## 🎯 Game Rules Implementation

### Initial Board

-   Generates 2 random tiles with value `2`
-   Places them at random empty positions
-   Creates a 4x4 grid as specified

### Movement Logic

Each direction (left, right, up, down) follows the same pattern:

1. **Slide**: Move all tiles in the specified direction
2. **Merge**: Combine adjacent tiles with the same value
3. **Score**: Add merged values to the total score
4. **New Tile**: Add a random `2` or `4` tile if move was valid

### Example Transformations

All examples from the specification are correctly implemented:

**Merge Left:**

```json
// Before
[null, 8, 2, 2] → [8, 4, null, null]
[4, 2, null, 2] → [4, 4, null, null]
```

**Merge Right:**

```json
// Before
[null, 8, 2, 2] → [null, null, 8, 4]
[4, 2, null, 2] → [null, null, 4, 4]
```

### Win/Loss Conditions

-   **Win**: Player creates a tile with value 2048
-   **Loss**: No empty spaces and no possible merges
-   **Continue**: Option to keep playing after winning

## 🧪 Testing

Comprehensive unit tests cover all core game mechanics:

-   Board creation and manipulation
-   Movement logic for all directions
-   Win/loss detection
-   Edge cases and error conditions

Run tests with:

```bash
npm test
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+
-   Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

For the interviewer, the most practical would be to do

```bash
npm run web
```
