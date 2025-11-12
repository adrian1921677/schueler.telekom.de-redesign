import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/dl-telekom-logo-01.jpg'
import RocketAnimation from './RocketAnimation'

interface WizardData {
  // Stufe 1: Stelle auswählen
  selectedPosition: {
    id: string
    title: string
    location: string
    type: string
  } | null

  // Stufe 2: Daten eingeben
  anrede: string
  vorname: string
  nachname: string
  geburtsdatum: string
  strasse: string
  plz: string
  ort: string
  email: string
  telefon: string
  schulabschluss: string
  abschlussjahr: string
  dataSynced: boolean

  // Stufe 3: Anlagen
  documents: File[]

  // Stufe 4: Zusammenfassung
  // (verwendet Daten aus den vorherigen Stufen)
}

const ApplicationWizard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    selectedPosition: null,
    anrede: '',
    vorname: '',
    nachname: '',
    geburtsdatum: '',
    strasse: '',
    plz: '',
    ort: '',
    email: user?.email || '',
    telefon: '',
    schulabschluss: '',
    abschlussjahr: '',
    dataSynced: false,
    documents: []
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showRocketAnimation, setShowRocketAnimation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Beispiel-Stellen
  const availablePositions = [
    { id: '1', title: 'Fachinformatiker*in für Anwendungsentwicklung', location: 'Bonn', type: 'Ausbildung' },
    { id: '2', title: 'IT-System-Elektroniker*in', location: 'Düsseldorf', type: 'Ausbildung' },
    { id: '3', title: 'Wirtschaftsinformatik (Duales Studium)', location: 'Berlin', type: 'Duales Studium' },
    { id: '4', title: 'Kaufmann/-frau für IT-System-Management', location: 'München', type: 'Ausbildung' },
    { id: '5', title: 'Praktikum IT-Bereich', location: 'Hamburg', type: 'Praktikum' }
  ]

  // Profil-Daten (simuliert - würde normalerweise aus dem Profil-Context kommen)
  const profileData = {
    anrede: 'Herr',
    vorname: user?.name.split(' ')[0] || '',
    nachname: user?.name.split(' ')[1] || '',
    geburtsdatum: '',
    strasse: '',
    plz: '',
    ort: '',
    email: user?.email || '',
    telefon: '',
    schulabschluss: 'Abitur',
    abschlussjahr: '2024'
  }

  const syncProfileData = () => {
    setWizardData({
      ...wizardData,
      anrede: profileData.anrede,
      vorname: profileData.vorname,
      nachname: profileData.nachname,
      geburtsdatum: profileData.geburtsdatum,
      strasse: profileData.strasse,
      plz: profileData.plz,
      ort: profileData.ort,
      email: profileData.email,
      telefon: profileData.telefon,
      schulabschluss: profileData.schulabschluss,
      abschlussjahr: profileData.abschlussjahr,
      dataSynced: true
    })
  }

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!wizardData.anrede) newErrors.anrede = 'Bitte wählen Sie eine Anrede'
    if (!wizardData.vorname.trim()) newErrors.vorname = 'Vorname ist erforderlich'
    if (!wizardData.nachname.trim()) newErrors.nachname = 'Nachname ist erforderlich'
    if (!wizardData.geburtsdatum) newErrors.geburtsdatum = 'Geburtsdatum ist erforderlich'
    if (!wizardData.strasse.trim()) newErrors.strasse = 'Straße ist erforderlich'
    if (!wizardData.plz.trim()) newErrors.plz = 'Postleitzahl ist erforderlich'
    if (!wizardData.ort.trim()) newErrors.ort = 'Ort ist erforderlich'
    
    if (!wizardData.email.trim()) {
      newErrors.email = 'E-Mail-Adresse ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(wizardData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }

    if (!wizardData.telefon.trim()) newErrors.telefon = 'Telefonnummer ist erforderlich'
    if (!wizardData.schulabschluss) newErrors.schulabschluss = 'Schulabschluss ist erforderlich'
    if (!wizardData.abschlussjahr.trim()) newErrors.abschlussjahr = 'Abschlussjahr ist erforderlich'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 2 && !validateStep2()) {
      return
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setShowRocketAnimation(true)
    // Hier würde die Bewerbung abgesendet werden
    console.log('Bewerbung abgesendet:', wizardData)
  }

  const handleAnimationComplete = () => {
    setShowRocketAnimation(false)
    setIsSubmitting(false)
    navigate('/dashboard')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setWizardData({
        ...wizardData,
        documents: Array.from(files)
      })
    }
  }

  const steps = [
    { number: 1, title: 'Stelle auswählen' },
    { number: 2, title: 'Daten eingeben & Synchronisation' },
    { number: 3, title: 'Anlagen hochladen' },
    { number: 4, title: 'Zusammenfassung & Senden' }
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-telekom-magenta text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Telekom Logo" className="h-12 w-auto mr-6" />
              <h1 className="text-xl md:text-2xl font-bold">
                Neue Bewerbung erstellen
              </h1>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb/Steps */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    currentStep === step.number
                      ? 'bg-telekom-magenta text-white'
                      : currentStep > step.number
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <span className={`mt-2 text-xs font-medium text-center leading-tight ${
                    currentStep === step.number ? 'text-telekom-magenta' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Stufe 1: Stelle auswählen */}
        {currentStep === 1 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-telekom-gray mb-6">Stelle auswählen</h2>
            <div className="space-y-4">
              {availablePositions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => setWizardData({ ...wizardData, selectedPosition: position })}
                  className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                    wizardData.selectedPosition?.id === position.id
                      ? 'border-telekom-magenta bg-telekom-magenta bg-opacity-5'
                      : 'border-gray-200 hover:border-telekom-magenta hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-telekom-gray text-lg mb-1">{position.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {position.location}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">{position.type}</span>
                      </div>
                    </div>
                    {wizardData.selectedPosition?.id === position.id && (
                      <svg className="w-6 h-6 text-telekom-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stufe 2: Daten eingeben & Synchronisation */}
        {currentStep === 2 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-telekom-gray mb-2">
              Bewerbung für {wizardData.selectedPosition?.title || 'ausgewählte Stelle'}
            </h2>
            <p className="text-gray-600 mb-6">{wizardData.selectedPosition?.location}</p>

            {/* Profil-Synchronisations-Button */}
            <div className="mb-8">
              {!wizardData.dataSynced ? (
                <button
                  onClick={syncProfileData}
                  className="w-full bg-telekom-magenta text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-telekom-magenta-dark transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">🚀</span>
                  <span>Daten aus Bewerber-Profil übernehmen</span>
                </button>
              ) : (
                <button
                  onClick={() => setWizardData({ ...wizardData, dataSynced: false })}
                  className="w-full bg-green-50 border-2 border-green-500 text-green-700 py-3 px-6 rounded-lg font-semibold hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Daten übernommen (Bearbeiten)</span>
                </button>
              )}
            </div>

            {/* Formularfelder */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Anrede */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Anrede *
                  </label>
                  <select
                    value={wizardData.anrede}
                    onChange={(e) => setWizardData({ ...wizardData, anrede: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.anrede ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Herr">Herr</option>
                    <option value="Frau">Frau</option>
                    <option value="Divers">Divers</option>
                  </select>
                  {errors.anrede && <p className="text-red-500 text-xs mt-1">{errors.anrede}</p>}
                </div>

                {/* Vorname */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Vorname *
                  </label>
                  <input
                    type="text"
                    value={wizardData.vorname}
                    onChange={(e) => setWizardData({ ...wizardData, vorname: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.vorname ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.vorname && <p className="text-red-500 text-xs mt-1">{errors.vorname}</p>}
                </div>

                {/* Nachname */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Nachname *
                  </label>
                  <input
                    type="text"
                    value={wizardData.nachname}
                    onChange={(e) => setWizardData({ ...wizardData, nachname: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.nachname ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nachname && <p className="text-red-500 text-xs mt-1">{errors.nachname}</p>}
                </div>

                {/* Geburtsdatum */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Geburtsdatum *
                  </label>
                  <input
                    type="date"
                    value={wizardData.geburtsdatum}
                    onChange={(e) => setWizardData({ ...wizardData, geburtsdatum: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.geburtsdatum ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.geburtsdatum && <p className="text-red-500 text-xs mt-1">{errors.geburtsdatum}</p>}
                </div>

                {/* Straße */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Straße *
                  </label>
                  <input
                    type="text"
                    value={wizardData.strasse}
                    onChange={(e) => setWizardData({ ...wizardData, strasse: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.strasse ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.strasse && <p className="text-red-500 text-xs mt-1">{errors.strasse}</p>}
                </div>

                {/* PLZ */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Postleitzahl *
                  </label>
                  <input
                    type="text"
                    value={wizardData.plz}
                    onChange={(e) => setWizardData({ ...wizardData, plz: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.plz ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.plz && <p className="text-red-500 text-xs mt-1">{errors.plz}</p>}
                </div>

                {/* Ort */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Ort *
                  </label>
                  <input
                    type="text"
                    value={wizardData.ort}
                    onChange={(e) => setWizardData({ ...wizardData, ort: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.ort ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.ort && <p className="text-red-500 text-xs mt-1">{errors.ort}</p>}
                </div>

                {/* E-Mail */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    E-Mail-Adresse *
                  </label>
                  <input
                    type="email"
                    value={wizardData.email}
                    onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Telefon */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    value={wizardData.telefon}
                    onChange={(e) => setWizardData({ ...wizardData, telefon: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.telefon ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+49 123 456789"
                  />
                  {errors.telefon && <p className="text-red-500 text-xs mt-1">{errors.telefon}</p>}
                </div>

                {/* Schulabschluss */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Höchster Schulabschluss *
                  </label>
                  <select
                    value={wizardData.schulabschluss}
                    onChange={(e) => setWizardData({ ...wizardData, schulabschluss: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.schulabschluss ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Bitte wählen...</option>
                    <option value="Abitur">Abitur</option>
                    <option value="Fachabitur">Fachabitur</option>
                    <option value="Realschulabschluss">Realschulabschluss</option>
                    <option value="Hauptschulabschluss">Hauptschulabschluss</option>
                  </select>
                  {errors.schulabschluss && <p className="text-red-500 text-xs mt-1">{errors.schulabschluss}</p>}
                </div>

                {/* Abschlussjahr */}
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">
                    Abschlussjahr *
                  </label>
                  <input
                    type="text"
                    value={wizardData.abschlussjahr}
                    onChange={(e) => setWizardData({ ...wizardData, abschlussjahr: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent ${
                      errors.abschlussjahr ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="z.B. 2024"
                  />
                  {errors.abschlussjahr && <p className="text-red-500 text-xs mt-1">{errors.abschlussjahr}</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stufe 3: Anlagen hochladen */}
        {currentStep === 3 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-telekom-gray mb-6">Anlagen hochladen</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600 mb-4">Laden Sie Ihre Bewerbungsunterlagen hoch</p>
                <label className="inline-block px-6 py-3 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark cursor-pointer transition-colors">
                  Dateien auswählen
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX, JPG oder PNG (max. 10MB pro Datei)</p>
              </div>

              {wizardData.documents.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h3 className="font-semibold text-telekom-gray">Hochgeladene Dateien:</h3>
                  {wizardData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-8 h-8 text-telekom-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="font-medium text-telekom-gray">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          const newDocs = [...wizardData.documents]
                          newDocs.splice(index, 1)
                          setWizardData({ ...wizardData, documents: newDocs })
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stufe 4: Zusammenfassung & Senden */}
        {currentStep === 4 && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-telekom-gray mb-6">Zusammenfassung & Senden</h2>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-telekom-gray mb-4">Ausgewählte Stelle</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-lg">{wizardData.selectedPosition?.title}</p>
                <p className="text-gray-600">{wizardData.selectedPosition?.location} • {wizardData.selectedPosition?.type}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-telekom-gray mb-4">Ihre Daten</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Anrede:</span>
                  <span className="ml-2 font-medium">{wizardData.anrede}</span>
                </div>
                <div>
                  <span className="text-gray-600">Name:</span>
                  <span className="ml-2 font-medium">{wizardData.vorname} {wizardData.nachname}</span>
                </div>
                <div>
                  <span className="text-gray-600">E-Mail:</span>
                  <span className="ml-2 font-medium">{wizardData.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Telefon:</span>
                  <span className="ml-2 font-medium">{wizardData.telefon}</span>
                </div>
                <div>
                  <span className="text-gray-600">Adresse:</span>
                  <span className="ml-2 font-medium">{wizardData.strasse}, {wizardData.plz} {wizardData.ort}</span>
                </div>
                <div>
                  <span className="text-gray-600">Schulabschluss:</span>
                  <span className="ml-2 font-medium">{wizardData.schulabschluss} ({wizardData.abschlussjahr})</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-telekom-gray mb-4">Anlagen</h3>
              {wizardData.documents.length > 0 ? (
                <ul className="space-y-2">
                  {wizardData.documents.map((doc, index) => (
                    <li key={index} className="text-sm text-gray-700">• {doc.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Keine Anlagen hochgeladen</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="max-w-3xl mx-auto mt-8 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 py-3 border-2 border-gray-300 text-telekom-gray rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Zurück
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              disabled={currentStep === 1 && !wizardData.selectedPosition}
              className="px-6 py-3 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Weiter
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="relative px-6 py-3 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Bewerbung senden'}
            </button>
          )}
        </div>
      </div>

      {/* Rocket Animation */}
      {showRocketAnimation && (
        <RocketAnimation onComplete={handleAnimationComplete} />
      )}

      {/* Footer */}
      <footer className="mt-auto bg-telekom-gray text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logo} alt="Telekom Logo" className="h-8 w-auto mr-4" />
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
            <div className="text-sm mt-4 md:mt-0">© 2025 Deutsche Telekom AG</div>
          </div>
        </div>
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

export default ApplicationWizard

