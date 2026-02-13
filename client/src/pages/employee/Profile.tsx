import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { RoleBadge } from '@/components/ui/StatusBadge';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Edit,
  Save,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function EmployeeProfile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">
              View and update your personal information
            </p>
          </div>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn-secondary">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={handleCancel} className="btn-ghost">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button onClick={handleSave} className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="card-elevated p-8">
          {/* Avatar & Name */}
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field text-xl font-bold mb-2"
                />
              ) : (
                <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
              )}
              <div className="flex items-center gap-3">
                <RoleBadge role={user.role} />
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{user.department}</span>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm">Email Address</span>
              </div>
              <p className="text-foreground font-medium pl-6">{user.email}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm">Phone Number</span>
              </div>
              {isEditing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field ml-6"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-foreground font-medium pl-6">
                  {user.phone || 'Not provided'}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building className="w-4 h-4" />
                <span className="text-sm">Department</span>
              </div>
              <p className="text-foreground font-medium pl-6">{user.department}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Member Since</span>
              </div>
              <p className="text-foreground font-medium pl-6">
                {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="card-elevated p-6 bg-muted/30">
          <h3 className="font-semibold text-foreground mb-2">Account Information</h3>
          <p className="text-sm text-muted-foreground">
            Your email and department are managed by your organization's IT department. 
            To request changes, please contact <span className="text-primary">it-support@company.com</span>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
