# tRPC Migration Plan

## 1. Current Architecture

```
REST API + React Query
├── API Routes (/api/exercises/*)
├── Zod Schemas (validation)
├── Drizzle (database)
└── React Query Hooks (client-side data fetching)
```

## 2. Target Architecture

```
tRPC + React Query
├── tRPC Router (server-side procedures)
├── Zod Schemas (reused from current implementation)
├── Drizzle (database)
└── tRPC Client Hooks (auto-generated, type-safe)
```

## 3. Migration Steps

### Phase 1: Setup & Infrastructure

1. Install Dependencies:
   ```bash
   npm install @trpc/server @trpc/client @trpc/react-query @trpc/next
   ```

2. Create tRPC Server Setup:
   ```typescript
   // src/server/trpc.ts
   import { initTRPC } from '@trpc/server';
   
   const t = initTRPC.create();
   
   export const router = t.router;
   export const publicProcedure = t.procedure;
   ```

3. Create Exercise Router:
   ```typescript
   // src/server/routers/exercise.ts
   import { router, publicProcedure } from '../trpc';
   import { exerciseFilterSchema, createExerciseSchema, updateExerciseSchema } from '@/lib/validations/exercise';
   
   export const exerciseRouter = router({
     list: publicProcedure
       .input(exerciseFilterSchema)
       .query(({ input }) => {
         // Current GET /api/exercises logic
       }),
     
     create: publicProcedure
       .input(createExerciseSchema)
       .mutation(({ input }) => {
         // Current POST /api/exercises logic
       }),
     
     // etc...
   });
   ```

### Phase 2: API Migration

1. Migrate Each Endpoint:
   - GET /api/exercises → list procedure
   - POST /api/exercises → create procedure
   - GET /api/exercises/:id → getById procedure
   - PUT /api/exercises/:id → update procedure
   - DELETE /api/exercises/:id → delete procedure

2. Add Error Handling:
   ```typescript
   export const exerciseRouter = router({
     list: publicProcedure
       .input(exerciseFilterSchema)
       .query(async ({ input, ctx }) => {
         try {
           // ... existing logic
         } catch (error) {
           throw new TRPCError({
             code: 'INTERNAL_SERVER_ERROR',
             message: 'Failed to fetch exercises',
             cause: error,
           });
         }
       }),
   });
   ```

### Phase 3: Client Migration

1. Setup tRPC Client:
   ```typescript
   // src/lib/trpc.ts
   import { createTRPCNext } from '@trpc/next';
   import type { AppRouter } from '@/server/routers/_app';
   
   export const trpc = createTRPCNext<AppRouter>({
     config() {
       return {
         links: [
           httpBatchLink({
             url: '/api/trpc',
           }),
         ],
       };
     },
   });
   ```

2. Update Components:
   ```typescript
   // Before
   const { data: exercises } = useExercises(filters);
   
   // After
   const { data: exercises } = trpc.exercise.list.useQuery(filters);
   ```

3. Add Provider:
   ```typescript
   // src/app/providers.tsx
   export function Providers({ children }: { children: React.ReactNode }) {
     return (
       <trpc.Provider>
         <QueryClientProvider client={queryClient}>
           <SessionProvider>{children}</SessionProvider>
         </QueryClientProvider>
       </trpc.Provider>
     );
   }
   ```

### Phase 4: Testing & Validation

1. Add Integration Tests:
   ```typescript
   describe('Exercise Router', () => {
     it('lists exercises with filters', async () => {
       const caller = appRouter.createCaller({});
       const result = await caller.exercise.list({
         category: 'Strength',
       });
       expect(result).toBeDefined();
     });
   });
   ```

2. Add Error Handling Tests:
   ```typescript
   it('handles invalid input', async () => {
     const caller = appRouter.createCaller({});
     await expect(
       caller.exercise.create({
         // @ts-expect-error - invalid input
         invalidField: 'test',
       })
     ).rejects.toThrow();
   });
   ```

## 4. Benefits

1. **Type Safety**:
   - Automatic type inference from Zod schemas
   - No manual type maintenance between client and server
   - Build-time error detection for API calls

2. **Developer Experience**:
   - Autocomplete for all API procedures
   - Inline error messages for invalid inputs
   - Simplified error handling

3. **Performance**:
   - Automatic request batching
   - Built-in caching through React Query
   - Reduced bundle size (no API client generation)

## 5. Rollback Plan

Since tRPC endpoints will be created alongside existing REST endpoints, we can:
1. Keep both implementations running in parallel
2. Migrate components one at a time
3. Roll back individual components if issues arise
4. Remove REST endpoints only after successful migration

## 6. Timeline

1. Phase 1 (Setup): 1 day
2. Phase 2 (API Migration): 2 days
3. Phase 3 (Client Migration): 2 days
4. Phase 4 (Testing): 1 day

Total: ~1 week for complete migration

## 7. Next Steps

1. Create proof of concept with one endpoint
2. Review type safety and developer experience
3. Proceed with full migration if POC is successful
4. Document new patterns and best practices 