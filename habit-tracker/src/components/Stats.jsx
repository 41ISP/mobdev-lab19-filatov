const Stats = ({habits}) => {
    const completedHabitsAmount = habits.filter((el) => el.isToday).length
      
    return habits.length > 0 && (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-value">{habits.length}</div>
                <div className="stat-label">Active Habits</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{Math.round((completedHabitsAmount / habits.length)*100)}%</div>
                <div className="stat-label">Completion Rate</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{habits.sort((a, b) => b.streak - a.streak)[0].streak}</div>
                <div className="stat-label">Day Streak</div>
            </div>
        </div>
    )
}

export default Stats