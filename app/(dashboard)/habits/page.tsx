import HabitForm from "@/components/habits/HabitForm";
import HabitCard from "@/components/habits/HabitCard";
import HabitList from "@/components/habits/HabitList";
import HabitDetails from "@/components/habits/HabitDetails";
import HabitStreak from "@/components/habits/HabitStreak";
import HabitProgress from "@/components/habits/HabitProgress";
import HabitCalendar from "@/components/habits/HabitCalendar";


export default function HabitsPage() {
  return (
    <main className="space-y-12 p-8">
          <HabitForm mode="create" />
          
          <HabitForm mode="edit" />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <HabitCard
              name="Exercise"
              category="Health"
              frequency="Daily"
              currentStreak={5}
              longestStreak={10}
              completionRate={80}
            />
            <HabitCard
              name="Drink Water"
              category="Health"
              frequency="Daily"
              currentStreak={3}
              longestStreak={7}
              completionRate={60}
              />
            <HabitCard
              name="Save Money"
              category="Finance"
              frequency="Weekly"
              currentStreak={2}
              longestStreak={5}
              completionRate={40}
            />
          </div>

          <HabitList />
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"><HabitDetails
            name="Exercise"
            description="Daily exercise routine to stay fit."
            category="Health"
            frequency="Daily"
            goal="Maintain a consistent exercise routine."
            />
          </div>

          

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <HabitStreak
                currentStreak={5}
                longestStreak={12}
            />
            </div>
          
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <HabitProgress
              completionRate={80}
              completedDays={20}
              totalDays={25}
            />
          </div>
          
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <HabitCalendar
                    completedDays={[1, 2, 3, 5, 8, 13, 21]}
                />
            </div>
    </main>
  );
}

