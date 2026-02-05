import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Redirect handler for old URL format (without birthday)
export default function LegacyRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/life-story', { replace: true })
  }, [navigate])

  return null
}
