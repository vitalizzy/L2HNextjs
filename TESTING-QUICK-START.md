# Quick Start - Testing

## Run Tests
```bash
npm test              # Run all tests
npm run test:watch   # Run tests in watch mode (auto-reload)
npm run test:coverage # Generate coverage report
```

## Current Status
✅ **All Tests Passing: 11/11**

### Test Suites
- `components/auth/LoginForm.test.tsx` - 6 tests ✅
- `components/auth/RegisterForm.test.tsx` - 5 tests ✅

### Coverage
- LoginForm component interactions
- RegisterForm component interactions
- Error handling
- Form submissions
- User input updates

## Files
- `jest.config.ts` - Jest configuration
- `jest.setup.ts` - Global mocks and setup
- `TESTING.md` - Complete testing documentation
- `TESTING-SETUP-COMPLETE.md` - Setup summary

## Add New Tests
1. Create file: `components/MyComponent.test.tsx`
2. Import: `import { render, screen } from '@testing-library/react'`
3. Mock hooks: `jest.mock('@/hooks/useAuth')`
4. Write tests following the existing patterns

## Key Patterns
```typescript
// Render component
render(<MyComponent />)

// Find elements
screen.getByRole('button')
screen.getByPlaceholderText('...')
screen.getByText('...')

// Interact
await userEvent.type(input, 'text')
await userEvent.click(button)

// Assert
expect(screen.getByText('...')).toBeInTheDocument()
```

---
For detailed info, see `TESTING.md`
