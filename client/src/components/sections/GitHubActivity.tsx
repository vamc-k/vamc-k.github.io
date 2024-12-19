import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function GitHubActivity() {
  type ContributionsResponse = {
    contributions: ContributionDay[];
  };

  const { data, isLoading } = useQuery<ContributionsResponse>({
    queryKey: ["/api/github-contributions"],
    retry: false,
  });

  const getDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const generateEmptyContributions = () => {
    const days: ContributionDay[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      days.push({
        date: getDateString(date),
        count: 0,
        level: 0,
      });
    }
    return days;
  };

  const contributionDays = data?.contributions || generateEmptyContributions();

  return (
    <section id="github-activity" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">GitHub Activity</h2>
        <Card>
          <CardHeader>
            <CardTitle>Contribution Graph</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-32 flex items-center justify-center">
                <p>Loading contributions...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="inline-grid grid-cols-[repeat(53,1fr)] gap-1">
                  {contributionDays.map((day) => (
                    <div
                      key={day.date}
                      className={`
                        w-3 h-3 rounded-sm
                        ${day.level === 0 && 'bg-primary/10'}
                        ${day.level === 1 && 'bg-primary/30'}
                        ${day.level === 2 && 'bg-primary/50'}
                        ${day.level === 3 && 'bg-primary/70'}
                        ${day.level === 4 && 'bg-primary/90'}
                      `}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}