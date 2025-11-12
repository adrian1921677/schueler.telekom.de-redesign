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
              <h3 className="text-xl font-semibold text-telekom-gray mb-4">
                Ihr Bewerbungs-Dashboard
              </h3>
              
              {/* Status-Hinweis */}
              {applications.some(app => app.status === 'Absage') && (
                <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-bold text-red-900 mb-1">Status: Absage</h4>
                      <p className="text-red-800 text-sm leading-relaxed">
                        Eine Ihrer Bewerbungen wurde leider nicht berücksichtigt. Dies bedeutet nicht, dass Sie sich nicht für andere Stellen bei der Telekom bewerben können. Wir ermutigen Sie, sich auf passende Positionen zu bewerben, die besser zu Ihrem Profil passen.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {applications.some(app => app.status === 'In Bearbeitung') && !applications.some(app => app.status === 'Absage') && (
                <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-900 mb-1">Status: In Bearbeitung</h4>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        Ihre Bewerbung wird aktuell von unserer Personalabteilung geprüft. Dieser Prozess umfasst die Sichtung Ihrer Unterlagen, die Prüfung Ihrer Qualifikationen und möglicherweise erste Gespräche. Sie werden über jeden weiteren Schritt per E-Mail informiert. Die Bearbeitung kann 2–4 Wochen dauern.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {applications.every(app => app.status === 'Bewerbung eingegangen') && (
                <div className="mb-4 p-4 bg-gray-50 border-l-4 border-gray-400 rounded-r-lg">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-gray-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">Status: Bewerbung eingegangen</h4>
                      <p className="text-gray-800 text-sm leading-relaxed">
                        Ihre Unterlagen wurden erfolgreich in unser System übernommen. Sie erhalten in Kürze eine Eingangsbestätigung per E-Mail. Die Bearbeitung dauert in der Regel 1–2 Wochen. Bitte haben Sie etwas Geduld, wir melden uns bei Ihnen.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed mt-4">
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
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
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

