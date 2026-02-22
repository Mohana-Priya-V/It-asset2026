import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { getUserAssignedAssets } from '@/data/mockData';
import { IssueType, IssuePriority } from '@/types';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ReportIssue() {
  const { user } = useAuth();
  const { toast } = useToast();
  const assets = user ? getUserAssignedAssets(user.id) : [];

  const [assetId, setAssetId] = useState('');
  const [issueType, setIssueType] = useState<IssueType>('not_working');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetId || !description.trim()) {
      toast({ title: 'Error', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    // In a real app, POST to /api/repair-requests
    toast({ title: 'Issue Reported', description: 'Your repair request has been submitted successfully.' });
    setAssetId('');
    setDescription('');
    setPriority('medium');
    setIssueType('not_working');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Report an Issue</h1>
          <p className="text-muted-foreground mt-1">Submit a repair or issue request for your assigned assets</p>
        </div>

        {assets.length === 0 ? (
          <div className="card-elevated p-12 text-center">
            <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No assets assigned</h3>
            <p className="text-muted-foreground">You need assigned assets to report an issue.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card-elevated p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Asset *</label>
              <select value={assetId} onChange={e => setAssetId(e.target.value)} className="input-field">
                <option value="">Select an asset</option>
                {assets.map(a => (
                  <option key={a.id} value={a.id}>{a.name} ({a.serialNumber})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Issue Type *</label>
              <select value={issueType} onChange={e => setIssueType(e.target.value as IssueType)} className="input-field">
                <option value="damaged">Damaged</option>
                <option value="not_working">Not Working</option>
                <option value="software_issue">Software Issue</option>
                <option value="hardware_issue">Hardware Issue</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Priority *</label>
              <select value={priority} onChange={e => setPriority(e.target.value as IssuePriority)} className="input-field">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Description *</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe the issue in detail..."
                className="input-field"
                rows={4}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">{description.length}/1000</p>
            </div>

            <button type="submit" className="btn-primary w-full">
              <AlertTriangle className="w-4 h-4 mr-2" /> Submit Issue Report
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
