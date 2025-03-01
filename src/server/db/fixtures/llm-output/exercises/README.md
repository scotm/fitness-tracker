# Exercise Fixture Data

This directory contains JSON files with exercise data that is used to seed the database. The data is organized by the model that generated it and the date it was created.

## Directory Structure

```
exercises/
├── gpt-4o-2024-08-06/
│   ├── Squats.json
│   ├── Push-ups.json
│   └── ... (other exercise files)
└── README.md (this file)
```

## JSON File Format

Each JSON file represents a single exercise and follows this structure:

```json
{
  "name": "Exercise Name",
  "how_to_perform": "Detailed instructions on how to perform the exercise...",
  "short_summary": "A brief description of the exercise",
  "muscles_used": ["Muscle1", "Muscle2", "..."],
  "equipment_used": ["Equipment1", "Equipment2", "..."],
  "alternative_names": ["Alternative Name 1", "Alternative Name 2"]
}
```

## How the Data is Used

The exercise fixture data is loaded during the database seeding process:

1. The `loadExerciseFixtures()` function in `src/server/db/seed/data.ts` reads all JSON files from the specified directory
2. Each JSON file is parsed and mapped to the `ExerciseInsert` format
3. The exercise data is added to the `exerciseData` array
4. Equipment relationships are generated using the `generateEquipmentRelations()` function
5. Muscle relationships are generated using the `generateMuscleRelations()` function
6. The seed function in `src/server/db/seed/index.ts` inserts all the data into the database

## Adding New Exercises

To add new exercises:

1. Create a new JSON file in the appropriate directory (e.g., `gpt-4o-2024-08-06/`)
2. Follow the JSON format described above
3. Run the database seeding process to add the new exercises to the database

## Mapping Logic

The seeding process includes mapping logic to ensure that equipment and muscle names match the existing records in the database:

- `mapEquipmentNames()` maps equipment names to match the existing equipment records
- `mapMuscleNames()` maps muscle names to match the existing muscle records
- `mapCategory()` assigns a category to each exercise (defaults to "Strength")
- `mapDifficulty()` assigns a difficulty level to each exercise (defaults to "Intermediate")

These mapping functions can be extended to handle more specific mappings as needed.
