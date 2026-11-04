export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'volunteer' | 'ngo' | 'tech_team';
export type NgoStatus = 'pending' | 'active' | 'suspended';
export type OpportunityCategory =
  | 'environment'
  | 'health'
  | 'education'
  | 'relief'
  | 'tech'
  | 'culture';
export type OpportunityStatus = 'open' | 'in_progress' | 'completed';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'completed';
export type CertificateStatus = 'verified' | 'revoked' | 'under_review';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: UserRole;
          wilaya: string;
          phone: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: UserRole;
          wilaya?: string;
          phone?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: UserRole;
          wilaya?: string;
          phone?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          updated_at?: string;
        };
      };
      ngos: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          license_number: string;
          wilaya: string;
          category: string;
          established_year: number | null;
          status: NgoStatus;
          contact_email: string;
          phone: string | null;
          president_name: string;
          logo_initial: string | null;
          registration_date: string;
          statute_doc_verified: boolean;
          general_assembly_verified: boolean;
          wilaya_approval_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          license_number: string;
          wilaya: string;
          category: string;
          established_year?: number | null;
          status?: NgoStatus;
          contact_email: string;
          phone?: string | null;
          president_name: string;
          logo_initial?: string | null;
          registration_date?: string;
          statute_doc_verified?: boolean;
          general_assembly_verified?: boolean;
          wilaya_approval_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          license_number?: string;
          wilaya?: string;
          category?: string;
          established_year?: number | null;
          status?: NgoStatus;
          contact_email?: string;
          phone?: string | null;
          president_name?: string;
          logo_initial?: string | null;
          registration_date?: string;
          statute_doc_verified?: boolean;
          general_assembly_verified?: boolean;
          wilaya_approval_verified?: boolean;
          updated_at?: string;
        };
      };
      opportunities: {
        Row: {
          id: string;
          ngo_id: string;
          title: string;
          category: OpportunityCategory;
          wilaya: string;
          commune: string;
          hours: number;
          spots_total: number;
          spots_taken: number;
          start_date: string;
          end_date: string;
          deadline: string;
          description: string;
          requirements: string[];
          benefits: string[];
          status: OpportunityStatus;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          ngo_id: string;
          title: string;
          category?: OpportunityCategory;
          wilaya: string;
          commune: string;
          hours: number;
          spots_total: number;
          spots_taken?: number;
          start_date: string;
          end_date: string;
          deadline: string;
          description: string;
          requirements?: string[];
          benefits?: string[];
          status?: OpportunityStatus;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          ngo_id?: string;
          title?: string;
          category?: OpportunityCategory;
          wilaya?: string;
          commune?: string;
          hours?: number;
          spots_total?: number;
          spots_taken?: number;
          start_date?: string;
          end_date?: string;
          deadline?: string;
          description?: string;
          requirements?: string[];
          benefits?: string[];
          status?: OpportunityStatus;
          featured?: boolean;
          updated_at?: string;
        };
      };
      workshops: {
        Row: {
          id: string;
          partner_ngo_id: string | null;
          title: string;
          organizer: string;
          category: string;
          duration_hours: number;
          days: number;
          total_seats: number;
          seats_booked: number;
          start_date: string;
          location: string;
          description: string;
          learning_outcomes: string[];
          accredited_by: string;
          badge_tag: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          partner_ngo_id?: string | null;
          title: string;
          organizer: string;
          category: string;
          duration_hours: number;
          days?: number;
          total_seats: number;
          seats_booked?: number;
          start_date: string;
          location: string;
          description: string;
          learning_outcomes?: string[];
          accredited_by: string;
          badge_tag?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          partner_ngo_id?: string | null;
          title?: string;
          organizer?: string;
          category?: string;
          duration_hours?: number;
          days?: number;
          total_seats?: number;
          seats_booked?: number;
          start_date?: string;
          location?: string;
          description?: string;
          learning_outcomes?: string[];
          accredited_by?: string;
          badge_tag?: string | null;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          volunteer_id: string;
          opportunity_id: string | null;
          workshop_id: string | null;
          status: ApplicationStatus;
          hours_logged: number;
          applicant_note: string | null;
          admin_response: string | null;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          volunteer_id: string;
          opportunity_id?: string | null;
          workshop_id?: string | null;
          status?: ApplicationStatus;
          hours_logged?: number;
          applicant_note?: string | null;
          admin_response?: string | null;
          applied_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          volunteer_id?: string;
          opportunity_id?: string | null;
          workshop_id?: string | null;
          status?: ApplicationStatus;
          hours_logged?: number;
          applicant_note?: string | null;
          admin_response?: string | null;
          updated_at?: string;
        };
      };
      certificates: {
        Row: {
          id: string;
          serial_number: string;
          volunteer_id: string | null;
          volunteer_name: string;
          volunteer_code: string | null;
          opportunity_id: string | null;
          workshop_id: string | null;
          opportunity_title: string;
          issuing_ngo_id: string | null;
          issuing_ngo_name: string;
          issuing_ngo_license: string;
          hours_accredited: number;
          issue_date: string;
          expiry_date: string | null;
          wilaya: string;
          crypto_hash: string;
          status: CertificateStatus;
          signer_name: string;
          signer_role: string;
          revocation_reason: string | null;
          qr_payload: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          serial_number: string;
          volunteer_id?: string | null;
          volunteer_name: string;
          volunteer_code?: string | null;
          opportunity_id?: string | null;
          workshop_id?: string | null;
          opportunity_title: string;
          issuing_ngo_id?: string | null;
          issuing_ngo_name: string;
          issuing_ngo_license: string;
          hours_accredited: number;
          issue_date?: string;
          expiry_date?: string | null;
          wilaya: string;
          crypto_hash: string;
          status?: CertificateStatus;
          signer_name: string;
          signer_role: string;
          revocation_reason?: string | null;
          qr_payload: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          serial_number?: string;
          volunteer_id?: string | null;
          volunteer_name?: string;
          volunteer_code?: string | null;
          opportunity_id?: string | null;
          workshop_id?: string | null;
          opportunity_title?: string;
          issuing_ngo_id?: string | null;
          issuing_ngo_name?: string;
          issuing_ngo_license?: string;
          hours_accredited?: number;
          issue_date?: string;
          expiry_date?: string | null;
          wilaya?: string;
          crypto_hash?: string;
          status?: CertificateStatus;
          signer_name?: string;
          signer_role?: string;
          revocation_reason?: string | null;
          qr_payload?: string;
          updated_at?: string;
        };
      };
    };
  };
}
