import { useNavigate } from 'react-router-dom'
import DatePicker from '../components/DatePicker'
import { formatBirthdayForUrl } from '../utils/dateUrl'

export default function LandingPage() {
  const navigate = useNavigate()

  const handleDateSubmit = async ({ year, month, day }) => {
    // Navigate immediately - ThemeWrapper handles loading + loading screen
    const dateStr = formatBirthdayForUrl({ year, month, day })
    navigate(`/life-story/${dateStr}/timeline`)
    return true
  }

  return <DatePicker onSubmit={handleDateSubmit} />
}
