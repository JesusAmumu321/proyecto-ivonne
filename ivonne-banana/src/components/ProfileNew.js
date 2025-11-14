import React, { useState } from 'react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    age: '',
    email: ''
  });

  const [achievements, setAchievements] = useState({
    diamonds: 0,
    coins: 0,
    experience: 0,
    completedTasks: 0,
    uncompletedTasks: 0,
    totalTasks: 0
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí podrías agregar lógica para guardar en Firebase
    console.log('Saving user info:', userInfo);
  };

  return (
    <div className="min-h-screen p-4" style={{backgroundColor: '#98BE91'}}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4 py-4">
        <button 
          className="text-white px-6 py-2 rounded-full text-sm font-montserrat border border-white" 
          style={{backgroundColor: 'rgba(91, 114, 87, 0.8)'}}
        >
          LEVEL
        </button>
        <h1 className="text-2xl font-bold text-white font-poppins">
          Perfil
        </h1>
        <button className="p-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Main Content Container */}
      <div 
        className="rounded-3xl p-6 max-w-6xl mx-auto" 
        style={{backgroundColor: 'rgba(219, 202, 255, 0.3)'}}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Section - Profile Picture and Stats */}
          <div className="lg:w-1/3">
            {/* Profile Picture */}
            <div className="relative mb-6">
              <div 
                className="w-48 h-48 mx-auto rounded-full flex items-center justify-center"
                style={{backgroundColor: 'rgba(160, 154, 195, 0.4)'}}
              >
                <svg className="w-24 h-24" style={{color: '#5B7257'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-4 right-4 text-white p-2 rounded-full"
                style={{backgroundColor: '#5B7257'}}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>

            {/* Stats - Logros */}
            <div 
              className="rounded-2xl p-4"
              style={{backgroundColor: 'rgba(160, 154, 195, 0.4)'}}
            >
              <h3 className="text-xl font-bold mb-4 font-poppins" style={{color: '#5B7257'}}>
                Logros
              </h3>
              <div className="space-y-3">
                <div className="font-montserrat" style={{color: '#5B7257'}}>
                  <span className="block text-sm opacity-80">Total de tareas realizadas</span>
                  <span className="text-lg font-bold">{achievements.completedTasks}</span>
                </div>
                <div className="font-montserrat" style={{color: '#5B7257'}}>
                  <span className="block text-sm opacity-80">Total de tareas no realizadas</span>
                  <span className="text-lg font-bold">{achievements.uncompletedTasks}</span>
                </div>
                <div className="font-montserrat" style={{color: '#5B7257'}}>
                  <span className="block text-sm opacity-80">Total de tareas</span>
                  <span className="text-lg font-bold">{achievements.totalTasks}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - User Info */}
          <div className="lg:w-2/3">
            {/* User Information */}
            <div 
              className="rounded-2xl p-6 mb-6"
              style={{backgroundColor: 'rgba(160, 154, 195, 0.4)'}}
            >
              <h3 className="text-xl font-bold mb-6 font-poppins" style={{color: '#5B7257'}}>
                Información del usuario
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-montserrat mb-2" style={{color: '#5B7257'}}>
                    Nombre de usuario
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={userInfo.username}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border font-montserrat"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: '#5B7257'}}
                      placeholder="Ingresa tu nombre de usuario"
                    />
                  ) : (
                    <div 
                      className="p-3 rounded-lg font-montserrat"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#5B7257'}}
                    >
                      {userInfo.username || "No especificado"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-montserrat mb-2" style={{color: '#5B7257'}}>
                    Edad
                  </label>
                  {isEditing ? (
                    <input
                      type="number"
                      name="age"
                      value={userInfo.age}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border font-montserrat"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: '#5B7257'}}
                      placeholder="Ingresa tu edad"
                    />
                  ) : (
                    <div 
                      className="p-3 rounded-lg font-montserrat"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#5B7257'}}
                    >
                      {userInfo.age || "No especificado"}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-montserrat mb-2" style={{color: '#5B7257'}}>
                    Correo Electronico
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg border font-montserrat"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.5)', borderColor: '#5B7257'}}
                      placeholder="Ingresa tu correo electrónico"
                    />
                  ) : (
                    <div 
                      className="p-3 rounded-lg font-montserrat"
                      style={{backgroundColor: 'rgba(255, 255, 255, 0.3)', color: '#5B7257'}}
                    >
                      {userInfo.email || "No especificado"}
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <button
                  onClick={handleSave}
                  className="mt-4 text-white px-6 py-2 rounded-lg font-montserrat hover:opacity-80 transition-opacity"
                  style={{backgroundColor: '#5B7257'}}
                >
                  Guardar
                </button>
              )}
            </div>

            {/* General Information */}
            <div 
              className="rounded-2xl p-6"
              style={{backgroundColor: 'rgba(160, 154, 195, 0.4)'}}
            >
              <h3 className="text-xl font-bold mb-6 font-poppins" style={{color: '#5B7257'}}>
                Información general
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="block font-montserrat text-sm opacity-80" style={{color: '#5B7257'}}>
                    Diamantes
                  </span>
                  <span className="text-2xl font-bold font-poppins" style={{color: '#5B7257'}}>
                    {achievements.diamonds}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-montserrat text-sm opacity-80" style={{color: '#5B7257'}}>
                    Monedas
                  </span>
                  <span className="text-2xl font-bold font-poppins" style={{color: '#5B7257'}}>
                    {achievements.coins}
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-montserrat text-sm opacity-80" style={{color: '#5B7257'}}>
                    Experiencia
                  </span>
                  <span className="text-2xl font-bold font-poppins" style={{color: '#5B7257'}}>
                    {achievements.experience}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
