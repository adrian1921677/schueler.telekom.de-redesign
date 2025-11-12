import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/dl-telekom-logo-01.jpg'

interface Application {
  verfahren: string
  ausbildungsort: string
  beruf: string
  status: 'Bewerbung eingegangen' | 'In Bearbeitung' | 'Absage' | 'Zusage'
  abgesendetAm: string
}

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Beispiel-Daten für Bewerbungen
  const applications: Application[] = [
    {
      verfahren: 'Praktikum 2025',
      ausbildungsort: 'Düsseldorf',
      beruf: 'Praktikum IT-System-Elektroniker*in',
      status: 'Absage',
      abgesendetAm: '05.10.2025'
    },
    {
      verfahren: 'Ausbildung 2025',
      ausbildungsort: 'Bonn',
      beruf: 'Fachinformatiker*in für Anwendungsentwicklung',
      status: 'In Bearbeitung',
      abgesendetAm: '15.11.2025'
    },
    {
      verfahren: 'Duales Studium 2025',
      ausbildungsort: 'Berlin',
      beruf: 'Wirtschaftsinformatik',
      status: 'Bewerbung eingegangen',
      abgesendetAm: '20.11.2025'
    }
  ]

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'Zusage':
        return 'bg-green-100 text-green-900 border-green-300 font-semibold'
      case 'Absage':
        return 'bg-red-100 text-red-900 border-red-300 font-semibold'
      case 'In Bearbeitung':
        return 'bg-blue-100 text-blue-900 border-blue-300 font-semibold'
      default:
        return 'bg-gray-100 text-gray-900 border-gray-300 font-semibold'
    }
  }

  const getStatusTooltip = (status: Application['status']) => {
    switch (status) {
      case 'Zusage':
        return {
          title: 'Status: Zusage',
          description: 'Ihre Bewerbung wurde erfolgreich angenommen! Sie erhalten in Kürze eine offizielle Zusage per E-Mail mit allen weiteren Informationen zu den nächsten Schritten, wie Vertragsunterlagen und Starttermin.'
        }
      case 'Absage':
        return {
          title: 'Status: Absage',
          description: 'Ihre Bewerbung wurde leider nicht berücksichtigt. Dies bedeutet nicht, dass Sie sich nicht für andere Stellen bei der Telekom bewerben können. Wir ermutigen Sie, sich auf passende Positionen zu bewerben, die besser zu Ihrem Profil passen.'
        }
      case 'In Bearbeitung':
        return {
          title: 'Status: In Bearbeitung',
          description: 'Ihre Bewerbung wird aktuell von unserer Personalabteilung geprüft. Dieser Prozess umfasst die Sichtung Ihrer Unterlagen, die Prüfung Ihrer Qualifikationen und möglicherweise erste Gespräche. Sie werden über jeden weiteren Schritt per E-Mail informiert. Die Bearbeitung kann 2–4 Wochen dauern.'
        }
      case 'Bewerbung eingegangen':
        return {
          title: 'Status: Bewerbung eingegangen',
          description: 'Ihre Unterlagen wurden erfolgreich in unser System übernommen. Sie erhalten in Kürze eine Eingangsbestätigung per E-Mail. Die Bearbeitung dauert in der Regel 1–2 Wochen. Bitte haben Sie etwas Geduld, wir melden uns bei Ihnen.'
        }
      default:
        return {
          title: '',
          description: ''
        }
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header mit Magenta Bar */}
      <div className="bg-telekom-magenta text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="mr-6">
              <img 
                src={logo} 
                alt="Telekom Logo" 
                className="h-12 w-auto"
              />
            </div>
            {/* Titel */}
            <h1 className="text-xl md:text-2xl font-bold">
              Jobbörse für Auszubildende/dual Studierende
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-bold text-telekom-gray mb-4">Anmeldung</h2>
              <p className="text-sm text-gray-600 mb-2">
                Angemeldet als:
              </p>
              <p className="text-sm font-semibold text-telekom-gray mb-6">
                {user?.name || 'Test Benutzer'}
              </p>
              
              <div className="space-y-3">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Kontoverwaltung
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center text-sm text-telekom-magenta hover:text-telekom-magenta-dark transition-colors group pl-2"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Bewerber-Profil
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center text-sm text-telekom-magenta hover:text-telekom-magenta-dark transition-colors group pl-2"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Einstellungen
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center text-sm text-telekom-magenta hover:text-telekom-magenta-dark transition-colors group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-gradient-to-br from-telekom-magenta to-telekom-magenta-dark text-white rounded-lg p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Ihre Bewerbungen</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">Gesamt:</span>
                  <span className="font-bold">{applications.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm opacity-90">In Bearbeitung:</span>
                  <span className="font-bold">
                    {applications.filter(a => a.status === 'In Bearbeitung').length}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-telekom-gray-light to-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-2xl font-bold text-telekom-gray mb-2">
                Guten Tag, {user?.name || 'Test Benutzer'}!
              </h2>
              <h3 className="text-xl font-semibold text-telekom-gray mb-3">
                Ihr Bewerbungs-Dashboard
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Verwalten Sie Ihre Bewerbungen, prüfen Sie den aktuellen Status und stellen Sie zusätzliche Informationen bereit.
              </p>
            </div>

            {/* Applications Table */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-telekom-gray-light border-b border-gray-200">
                <h3 className="text-lg font-bold text-telekom-gray">Ihre Bewerbungen</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Verfahren
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Ausbildungsort
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Beruf
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Abgesendet am
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Mehr Infos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((app, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-telekom-gray">
                          {app.verfahren}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {app.ausbildungsort}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {app.beruf}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="relative group">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusColor(app.status)} cursor-help`}>
                              {app.status}
                              <svg className="w-3.5 h-3.5 ml-1.5 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block z-50 w-80">
                              <div className="bg-gray-900 text-white text-sm rounded-lg py-3 px-4 shadow-xl">
                                <div className="font-semibold mb-1 text-telekom-magenta">
                                  {getStatusTooltip(app.status).title}
                                </div>
                                <div className="text-gray-200 leading-relaxed">
                                  {getStatusTooltip(app.status).description}
                                </div>
                                <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {app.abgesendetAm}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-telekom-magenta hover:text-telekom-magenta-dark font-semibold underline decoration-2 underline-offset-2 hover:decoration-telekom-magenta-dark transition-colors">
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-white border-2 border-telekom-magenta text-telekom-magenta px-6 py-4 rounded-lg font-semibold hover:bg-telekom-gray-light transition-colors shadow-md flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Neue Bewerbung erstellen
              </button>
              <button className="bg-telekom-magenta text-white px-6 py-4 rounded-lg font-semibold hover:bg-telekom-magenta-dark transition-colors shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Verfügbare Stellen durchsuchen
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-telekom-gray text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={logo} 
                alt="Telekom Logo" 
                className="h-8 w-auto mr-4"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <a href="#" className="hover:text-telekom-magenta transition-colors">Hilfe</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-telekom-magenta transition-colors">Impressum</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-telekom-magenta transition-colors">Haftungsausschluss</a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-telekom-magenta transition-colors flex items-center">
                Datenschutz
                <span className="ml-1 w-4 h-4 bg-telekom-magenta rounded flex items-center justify-center text-xs">!</span>
              </a>
              <span className="text-gray-500">|</span>
              <a href="#" className="hover:text-telekom-magenta transition-colors">Hotline</a>
            </div>
            <div className="text-sm mt-4 md:mt-0">
              © 2025 Deutsche Telekom AG
            </div>
          </div>
        </div>
        
        {/* Cookie Notice */}
        <div className="bg-telekom-gray-dark py-3">
          <div className="container mx-auto px-4">
            <p className="text-xs text-gray-300 text-center">
              Diese Webseite verwendet ausschließlich die technisch erforderlichen Cookies, um Ihnen den bestmöglichen Service zu gewährleisten. 
              Weitere Informationen finden Sie in den{' '}
              <a href="#" className="text-telekom-magenta hover:underline">Datenschutzhinweisen</a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard

