# Testing Documentation

## Setup

### Installation
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @types/jest ts-jest ts-node jest-environment-jsdom @testing-library/user-event
```

### Configuration Files

#### jest.config.ts
Configuración principal de Jest con soporte para TypeScript y JSX usando ts-jest preset.

#### jest.setup.ts
Setup file que:
- Importa `@testing-library/jest-dom` para extensiones de matchers
- Mockea módulos de Next.js (`next/navigation`, `next/image`)
- Mockea Supabase client
- Mockea hooks de autenticación

### Available Scripts

```bash
npm test              # Ejecutar todos los tests
npm run test:watch   # Modo watch (re-ejecuta al cambiar archivos)
npm run test:coverage # Generar reporte de cobertura
```

## Test Files

### components/auth/LoginForm.test.tsx
**Status: ✅ 6/6 tests passing**

Tests para el componente `LoginForm`:
- ✅ Renderizado correcto del formulario
- ✅ Renderizado de links de registro y recuperación de contraseña
- ✅ Actualización del campo de email
- ✅ Actualización del campo de contraseña
- ✅ Llamada a login con credenciales correctas
- ✅ Manejo de errores

**Tests: 6**

### components/auth/RegisterForm.test.tsx
**Status: ✅ 5/5 tests passing**

Tests para el componente `RegisterForm`:
- ✅ Renderizado correcto del formulario
- ✅ Renderizado de links de términos y privacidad
- ✅ Renderizado de link de login
- ✅ Actualización de campos del formulario
- ✅ Llamada a register con datos correctos
- ✅ Manejo de errores

**Tests: 5**

## Ejecución de Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar en modo watch
npm run test:watch

# Con cobertura
npm run test:coverage

# Tests Output:
# PASS components/auth/LoginForm.test.tsx (6 tests)
# PASS components/auth/RegisterForm.test.tsx (5 tests)
# 
# Test Suites: 2 passed, 2 total
# Tests:       11 passed, 11 total
```

## Mocking Strategy

### Hooks
- `useAuth()` - Mockeado en jest.setup.ts para devolver funciones mock
- `useRouter()` - Mockeado en jest.setup.ts

### Módulos Externos
- `next/link` - Mockeado en cada archivo de test para devolver un elemento `<a>`
- `next/navigation` - Mockeado globalmente en jest.setup.ts
- `@supabase/ssr` y `@supabase/supabase-js` - Mockeados en jest.setup.ts

### Best Practices Implementados

1. **Selectores de elementos**
   - Usar `getByRole` para elementos interactivos
   - Usar `getByPlaceholderText` para inputs
   - Usar `getByText` solo para texto único
   - Usar `getByTestId` como último recurso

2. **Async/Await**
   - Usar `userEvent` en lugar de `fireEvent`
   - Usar `waitFor` para operaciones asincrónicas
   - Manejar timeouts apropiados

3. **Tests Independientes**
   - Limpiar mocks en `beforeEach`
   - No depender de estado compartido entre tests
   - Cada test es completamente independiente

4. **TypeScript Support**
   - Todos los archivos de test usan TypeScript
   - Tipos correctamente anotados
   - JSX soportado en archivos .test.tsx

## Estado del Proyecto

✅ **Configuración Completada**
- Jest instalado y configurado
- React Testing Library integrado
- Mocking global de módulos externos
- TypeScript soportado correctamente
- Todos los tests pasando

## Próximos Pasos

1. **Agregar más cobertura**
   - Tests para `useAuth` hook
   - Tests para componentes de layout
   - Tests para pages

2. **Validaciones**
   - Implementar tests para validaciones de formularios
   - Considerar crear archivo separado para lógica de validación

3. **E2E Testing**
   - Agregar Playwright para tests E2E
   - Configurar tests en CI/CD

4. **Coverage Report**
   - Ejecutar `npm run test:coverage`
   - Target: >80% coverage

5. **Integration Tests**
   - Tests con Supabase real (en staging)
   - Tests de rutas con Next.js

## Troubleshooting

### Problema: Tests fallan con "JSX is not available"
**Solución**: Verificar que `jest.config.ts` tiene la configuración correcta con ts-jest

### Problema: Mocks no funcionan correctamente
**Solución**: Asegurar que `jest.clearAllMocks()` se ejecuta en `beforeEach`

### Problema: Tests lentos
**Solución**: Verificar que los mocks no hacen operaciones reales, usar `maxWorkers` si es necesario

## Archivos Relacionados

- `jest.config.ts` - Configuración de Jest
- `jest.setup.ts` - Setup y mocks globales
- `package.json` - Scripts y dependencias de testing
- `components/auth/LoginForm.test.tsx` - Tests de LoginForm
- `components/auth/RegisterForm.test.tsx` - Tests de RegisterForm
- `tsconfig.json` - Configuración TypeScript con tipos de Jest

