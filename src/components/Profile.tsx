import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/dl-telekom-logo-01.jpg'
import Toast from './Toast'

interface ProfileData {
  // Persönliche Daten
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  address: string
  city: string
  postalCode: string
  country: string
  
  // Interessen
  interests: string[]
  hobbies: string
  languages: { language: string; level: string }[]
  
  // Ausbildung & Qualifikationen
  school: string
  graduationDate: string
  averageGrade: string
  qualifications: string[]
  
  // Zeugnisse & Dokumente
  documents: { name: string; type: string; uploadDate: string }[]
  
  // Ausbildungswünsche
  preferredLocation: string[]
  preferredField: string[]
  availability: string
}

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Deutschland',
    interests: [],
    hobbies: '',
    languages: [],
    school: '',
    graduationDate: '',
    averageGrade: '',
    qualifications: [],
    documents: [],
    preferredLocation: [],
    preferredField: [],
    availability: ''
  })

  const [newInterest, setNewInterest] = useState('')
  const [newLanguage, setNewLanguage] = useState({ language: '', level: 'Gut' })
  const [newQualification, setNewQualification] = useState('')
  const [activeTab, setActiveTab] = useState<'personal' | 'interests' | 'education' | 'documents' | 'preferences'>('personal')
  const [isSaving, setIsSaving] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simuliere Speichern
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setShowToast(true)
  }

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, newInterest.trim()]
      })
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter(i => i !== interest)
    })
  }

  const addLanguage = () => {
    if (newLanguage.language.trim()) {
      setProfileData({
        ...profileData,
        languages: [...profileData.languages, { ...newLanguage }]
      })
      setNewLanguage({ language: '', level: 'Gut' })
    }
  }

  const removeLanguage = (index: number) => {
    setProfileData({
      ...profileData,
      languages: profileData.languages.filter((_, i) => i !== index)
    })
  }

  const addQualification = () => {
    if (newQualification.trim() && !profileData.qualifications.includes(newQualification.trim())) {
      setProfileData({
        ...profileData,
        qualifications: [...profileData.qualifications, newQualification.trim()]
      })
      setNewQualification('')
    }
  }

  const removeQualification = (qualification: string) => {
    setProfileData({
      ...profileData,
      qualifications: profileData.qualifications.filter(q => q !== qualification)
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newDocuments = Array.from(files).map(file => ({
        name: file.name,
        type: file.type,
        uploadDate: new Date().toLocaleDateString('de-DE')
      }))
      setProfileData({
        ...profileData,
        documents: [...profileData.documents, ...newDocuments]
      })
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-telekom-magenta text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src={logo} alt="Telekom Logo" className="h-12 w-auto mr-6" />
              <h1 className="text-xl md:text-2xl font-bold">
                Bewerber-Profil
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

      <div className="container mx-auto px-4 py-8 flex-1">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'personal', label: 'Persönliche Daten', icon: '👤' },
              { id: 'interests', label: 'Interessen', icon: '⭐' },
              { id: 'education', label: 'Ausbildung & Qualifikationen', icon: '🎓' },
              { id: 'documents', label: 'Zeugnisse & Dokumente', icon: '📄' },
              { id: 'preferences', label: 'Ausbildungswünsche', icon: '🎯' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-telekom-magenta text-telekom-magenta'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Persönliche Daten */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-telekom-gray mb-6">Persönliche Daten</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Vorname *</label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Nachname *</label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">E-Mail *</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Telefon</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    placeholder="+49 123 456789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Geburtsdatum *</label>
                  <input
                    type="date"
                    value={profileData.birthDate}
                    onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Land</label>
                  <input
                    type="text"
                    value={profileData.country}
                    onChange={(e) => setProfileData({...profileData, country: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Straße & Hausnummer</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Postleitzahl</label>
                  <input
                    type="text"
                    value={profileData.postalCode}
                    onChange={(e) => setProfileData({...profileData, postalCode: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Stadt</label>
                  <input
                    type="text"
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Interessen */}
          {activeTab === 'interests' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-telekom-gray mb-6">Interessen & Hobbies</h2>
              
              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Interessen</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    placeholder="z.B. Programmierung, Sport, Musik..."
                  />
                  <button
                    onClick={addInterest}
                    className="px-4 py-2 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark transition-colors"
                  >
                    Hinzufügen
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-telekom-magenta text-white rounded-full text-sm"
                    >
                      {interest}
                      <button
                        onClick={() => removeInterest(interest)}
                        className="ml-2 hover:text-gray-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Hobbies & Freizeitaktivitäten</label>
                <textarea
                  value={profileData.hobbies}
                  onChange={(e) => setProfileData({...profileData, hobbies: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  placeholder="Beschreiben Sie Ihre Hobbies und Freizeitaktivitäten..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Sprachen</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newLanguage.language}
                    onChange={(e) => setNewLanguage({...newLanguage, language: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    placeholder="Sprache"
                  />
                  <select
                    value={newLanguage.level}
                    onChange={(e) => setNewLanguage({...newLanguage, level: e.target.value})}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  >
                    <option>Gut</option>
                    <option>Sehr gut</option>
                    <option>Muttersprache</option>
                    <option>Grundkenntnisse</option>
                  </select>
                  <button
                    onClick={addLanguage}
                    className="px-4 py-2 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark transition-colors"
                  >
                    Hinzufügen
                  </button>
                </div>
                <div className="space-y-2">
                  {profileData.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{lang.language}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{lang.level}</span>
                        <button
                          onClick={() => removeLanguage(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ausbildung & Qualifikationen */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-telekom-gray mb-6">Ausbildung & Qualifikationen</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Schule / Bildungseinrichtung</label>
                  <input
                    type="text"
                    value={profileData.school}
                    onChange={(e) => setProfileData({...profileData, school: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    placeholder="z.B. Gymnasium Musterstadt"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Abschlussdatum</label>
                  <input
                    type="date"
                    value={profileData.graduationDate}
                    onChange={(e) => setProfileData({...profileData, graduationDate: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-telekom-gray mb-2">Durchschnittsnote</label>
                  <input
                    type="text"
                    value={profileData.averageGrade}
                    onChange={(e) => setProfileData({...profileData, averageGrade: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    placeholder="z.B. 2,3"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Weitere Qualifikationen</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                    placeholder="z.B. IT-Zertifikat, Sprachzertifikat..."
                  />
                  <button
                    onClick={addQualification}
                    className="px-4 py-2 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark transition-colors"
                  >
                    Hinzufügen
                  </button>
                </div>
                <div className="space-y-2">
                  {profileData.qualifications.map((qual, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span>{qual}</span>
                      <button
                        onClick={() => removeQualification(qual)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Zeugnisse & Dokumente */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-telekom-gray mb-6">Zeugnisse & Dokumente</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-gray-600 mb-4">Laden Sie Ihre Zeugnisse und Dokumente hoch</p>
                <label className="inline-block px-6 py-3 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark cursor-pointer transition-colors">
                  Dateien auswählen
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">PDF, JPG oder PNG (max. 10MB pro Datei)</p>
              </div>

              {profileData.documents.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-telekom-gray">Hochgeladene Dokumente</h3>
                  {profileData.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-8 h-8 text-telekom-magenta mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="font-medium text-telekom-gray">{doc.name}</p>
                          <p className="text-sm text-gray-500">Hochgeladen am {doc.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-telekom-magenta hover:text-telekom-magenta-dark">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Ausbildungswünsche */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-telekom-gray mb-6">Ausbildungswünsche</h2>
              
              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Bevorzugte Standorte</label>
                <div className="flex flex-wrap gap-2">
                  {['Berlin', 'Bonn', 'Düsseldorf', 'München', 'Hamburg', 'Frankfurt', 'Stuttgart', 'Köln'].map(location => (
                    <button
                      key={location}
                      onClick={() => {
                        const isSelected = profileData.preferredLocation.includes(location)
                        setProfileData({
                          ...profileData,
                          preferredLocation: isSelected
                            ? profileData.preferredLocation.filter(l => l !== location)
                            : [...profileData.preferredLocation, location]
                        })
                      }}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        profileData.preferredLocation.includes(location)
                          ? 'bg-telekom-magenta text-white border-telekom-magenta'
                          : 'bg-white text-telekom-gray border-gray-300 hover:border-telekom-magenta'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Bevorzugte Bereiche</label>
                <div className="flex flex-wrap gap-2">
                  {['IT & Digitalisierung', 'Kaufmännisch', 'Technisch', 'Vertrieb', 'Marketing', 'HR'].map(field => (
                    <button
                      key={field}
                      onClick={() => {
                        const isSelected = profileData.preferredField.includes(field)
                        setProfileData({
                          ...profileData,
                          preferredField: isSelected
                            ? profileData.preferredField.filter(f => f !== field)
                            : [...profileData.preferredField, field]
                        })
                      }}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        profileData.preferredField.includes(field)
                          ? 'bg-telekom-magenta text-white border-telekom-magenta'
                          : 'bg-white text-telekom-gray border-gray-300 hover:border-telekom-magenta'
                      }`}
                    >
                      {field}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-telekom-gray mb-2">Verfügbarkeit</label>
                <select
                  value={profileData.availability}
                  onChange={(e) => setProfileData({...profileData, availability: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-telekom-magenta focus:border-transparent"
                >
                  <option value="">Bitte wählen...</option>
                  <option value="sofort">Sofort verfügbar</option>
                  <option value="3-months">In 3 Monaten</option>
                  <option value="6-months">In 6 Monaten</option>
                  <option value="next-year">Nächstes Jahr</option>
                </select>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border-2 border-gray-300 text-telekom-gray rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-telekom-magenta text-white rounded-lg hover:bg-telekom-magenta-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Wird gespeichert...
                </>
              ) : (
                'Profil speichern'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-telekom-gray text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={logo} alt="Telekom Logo" className="h-8 w-auto mr-4" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#" className="hover:text-telekom-magenta transition-colors">Hilfe</a>
              <a href="#" className="hover:text-telekom-magenta transition-colors">Impressum</a>
              <a href="#" className="hover:text-telekom-magenta transition-colors">Haftungsausschluss</a>
              <a href="#" className="hover:text-telekom-magenta transition-colors flex items-center">
                Datenschutz
                <span className="ml-1 w-4 h-4 bg-telekom-magenta rounded flex items-center justify-center text-xs">!</span>
              </a>
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

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="Daten gespeichert!"
          type="success"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  )
}

export default Profile

