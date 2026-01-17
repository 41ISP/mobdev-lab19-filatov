import { useEffect, useState } from "react"
import "./Main.css"
import HabitCard from "../../components/HabitCard"
import HabitForm from "../../components/HabitForm"
import Stats from "../../components/Stats"
import { getObject, setObject } from "../../utils/storage"
import {nanoid} from "nanoid"
import { useNavigate } from "react-router-dom"

const initialHabits = [
    {
        id: nanoid(),
        name: "Изучить React",
        notificationTime: "7:00PM",
        frequency: "daily",
        streak: 9,
        isToday: true,
        color: "green"
    },
    {
        id:nanoid(),
        name: "Почитать книжку",
        notificationTime: "9:00PM",
        frequency: "weekly",
        streak: 11,
        isToday: false,
        color: "red"
    }
]
const Main = () => {
    const [habits, setHabits] = useState([])
    const navigate = useNavigate()
    useEffect(() =>{
        const loadHabits = async () =>{
            const habits = await getObject("habits")
            setHabits(habits)
        }
        loadHabits()
    }, [])
    const [form, setForm] = useState({
        habitName: "",
        frequency: "dailly",
        notificationTime: "07:00"
    })
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }
    const handleFormSubmit = () => {
        const newHabit = {
            id: nanoid(),
            name: form.habitName,
            notificationTime: form.notificationTime,
            frequency: form.frequency,
            streak: 0,
            isToday: false,
            color: "red"
        }
        setHabits((val) => [...val, newHabit])
    }
    const toggleToday =(id) =>
{
    const OldHabit = habits.find((el) => el.id === id)
    const newHabits = {...OldHabit, isToday: !OldHabit.isToday, streak: OldHabit.isToday ? OldHabit.streak -1 : OldHabit.streak + 1}
    setHabits((state) => state.map((el) => el.id === id ? newHabits : el))
}
    useEffect(() => {
        setObject("habits", habits)
    }, [habits])
    return (
         <div className="container">
            <header>
                <h1>🎯 Smart Habit Tracker</h1>
                <p className="subtitle">Build better habits, one day at a time</p>
            </header>

            <Stats habits={habits} />

            <HabitForm form={form} handleFormChange={handleFormChange} handleFormSubmit ={handleFormSubmit} />

            <div className="habits-section">
                <h2>📋 Today's Habits</h2>
                {habits.sort((a, b) => b.streak - a.streak).map((el) => <HabitCard toggleToday= {() => toggleToday(el.id)} {...el} 
                    onClick={() => navigate(`/history/${el.id}`)}
                    />)}

            </div>
        </div>
    )
}

export default Main