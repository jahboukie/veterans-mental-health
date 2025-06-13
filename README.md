# VetSupport - Veterans Mental Health Platform

A specialized mental health support platform designed specifically for military veterans and their families, featuring veteran-specific assessments, AI companion support, and crisis intervention protocols.

## 🇺🇸 Features

### Veteran-Specific Features
- **Military Culture-Aware UI/UX** - Designed with military terminology and cultural understanding
- **Specialized Risk Assessment Tools** - PCL-5 (PTSD) and PHQ-9 (Depression) assessments
- **Crisis Intervention** - Veteran-specific crisis protocols with immediate connection to Veterans Crisis Line (988)
- **Veteran Provider Network** - Connect with mental health providers who specialize in veteran care

### Alex AI Companion
- **Military Culture Awareness** - Trained in military terminology and veteran experiences
- **Trauma-Informed Conversations** - Specialized conversation flows for PTSD and military trauma
- **Crisis Detection** - Automatic detection of crisis situations with immediate resource connection
- **24/7 Availability** - Always available support companion

### Privacy & Security
- **Zero-Knowledge Architecture** - End-to-end encryption with no access to personal data
- **Military-Grade Security** - Enhanced privacy for veterans concerned about VA records
- **Anonymous Mode** - Complete anonymity in peer support and group discussions
- **HIPAA Compliance** - Full compliance with healthcare privacy regulations

### Community Features
- **Peer Support Networks** - Connect with other veterans who understand your experiences
- **Family Support** - Resources and support for military spouses and children
- **Branch-Specific Groups** - Support groups organized by military branch
- **Anonymous Chat Forums** - Safe spaces for anonymous discussions

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with military-themed color palette
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Headless UI + Heroicons
- **Charts**: Recharts
- **Animations**: Framer Motion

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jahboukie/veterans-mental-health.git
   cd veterans-mental-health/web-apps/veteransmentalhealth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   ```sql
   -- Veteran Profiles
   CREATE TABLE veteran_profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     email TEXT NOT NULL,
     app_name TEXT DEFAULT 'veterans-mental-health',
     profile_data JSONB,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Veteran Assessments
   CREATE TABLE veteran_assessments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     veteran_id UUID REFERENCES veteran_profiles(id),
     pcl5_score INTEGER,
     phq9_score INTEGER,
     gad7_score INTEGER,
     assessment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     risk_level TEXT CHECK (risk_level IN ('low', 'moderate', 'high', 'crisis')),
     recommendations TEXT[]
   );

   -- Enable Row Level Security
   ALTER TABLE veteran_profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE veteran_assessments ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own profile" ON veteran_profiles
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile" ON veteran_profiles
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can view own assessments" ON veteran_assessments
     FOR SELECT USING (auth.uid() = veteran_id);

   CREATE POLICY "Users can insert own assessments" ON veteran_assessments
     FOR INSERT WITH CHECK (auth.uid() = veteran_id);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3014`

## 📱 Usage

### For Veterans
1. **Sign Up** - Create an account with military-grade privacy protection
2. **Complete Onboarding** - Provide service information and privacy preferences
3. **Take Assessments** - Complete PCL-5 and PHQ-9 mental health screenings
4. **Chat with Alex** - Talk to your AI companion trained in military culture
5. **Access Crisis Support** - Immediate access to Veterans Crisis Line and resources

### For Families
1. **Family Access** - Enable family member access in privacy settings
2. **Family Resources** - Access support materials for military families
3. **Crisis Support** - Family members can access crisis resources and support

## 🔒 Privacy & Security

- **Zero-Knowledge Architecture**: Your data is encrypted end-to-end
- **No VA Sharing**: Information is never shared with VA without explicit consent
- **Anonymous Mode**: Complete anonymity in peer interactions
- **Crisis Detection**: Automatic detection with immediate resource connection
- **Secure Storage**: All data encrypted at rest and in transit

## 🆘 Crisis Resources

- **Veterans Crisis Line**: 988 (Press 1)
- **Crisis Text Line**: Text 838255
- **Crisis Chat**: Available at veteranscrisisline.net
- **Emergency**: Call 911 for immediate danger

## 🤝 Contributing

We welcome contributions from the veteran and developer communities. Please read our contributing guidelines and code of conduct.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Veterans Crisis Line for their life-saving work
- Military mental health professionals who guided our approach
- The veteran community for their feedback and support
- Open source contributors who made this platform possible

## 📞 Support

For technical support or questions:
- Email: team.mobileweb@gmail.com
- GitHub Issues: [Create an issue](https://github.com/jahboukie/veterans-mental-health/issues)

For mental health crisis support:
- Veterans Crisis Line: 988 (Press 1)
- Crisis Text: 838255
- Crisis Chat: veteranscrisisline.net

---

**Remember: You are not alone. Help is available 24/7. Your service matters, and your mental health matters.**
