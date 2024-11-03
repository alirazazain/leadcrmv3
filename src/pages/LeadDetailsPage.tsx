import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLeadStore } from '../store/leadStore';
import { mockCompanies } from '../data/mockCompanies';
import { Person } from '../types';

export function LeadDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const leads = useLeadStore((state) => state.leads);
  const [lead, setLead] = useState(leads.find(l => l.id === id));
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(mockCompanies.find(c => c.name === lead?.companyName));
  const [persons, setPersons] = useState<Array<{ person: Person; isPrimary: boolean }>>([]);

  useEffect(() => {
    const foundLead = leads.find(l => l.id === id);
    setLead(foundLead);
    
    if (foundLead) {
      const foundCompany = mockCompanies.find(c => c.name === foundLead.companyName);
      setCompany(foundCompany);
      
      if (foundCompany && foundLead.persons) {
        setPersons(foundLead.persons);
      }
    }
    setLoading(false);
  }, [id, leads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!lead || !company) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Lead not found</h2>
        <p className="mt-2 text-gray-600">The lead you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/leads"
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Leads
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/leads"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Leads
        </Link>
        <h1 className="text-2xl font-semibold text-gray-900">Lead Details</h1>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {/* Job Details */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Job Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Job Title</label>
              <p className="mt-1 text-sm text-gray-900">{lead.jobTitle}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Job Nature</label>
              <p className="mt-1 text-sm text-gray-900">{lead.jobNature}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Workplace Model</label>
              <p className="mt-1 text-sm text-gray-900">{lead.workplaceModel}</p>
            </div>
            {lead.officeLocation && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Office Location</label>
                <p className="mt-1 text-sm text-gray-900">{lead.officeLocation}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-500">Job Post URL</label>
              <a
                href={lead.jobPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-sm text-indigo-600 hover:text-indigo-500"
              >
                {lead.jobPostUrl}
              </a>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Source</label>
              <p className="mt-1 text-sm text-gray-900">{lead.source}</p>
            </div>
          </div>

          {/* Salary Information */}
          {(lead.salaryAmount || lead.salaryCurrency || lead.salaryType) && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Salary Information</h3>
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                {lead.salaryType && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{lead.salaryType}</p>
                  </div>
                )}
                {lead.salaryCurrency && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Currency</label>
                    <p className="mt-1 text-sm text-gray-900">{lead.salaryCurrency}</p>
                  </div>
                )}
                {lead.salaryAmount && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Amount</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {lead.salaryAmount.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Description */}
          {lead.description && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{lead.description}</p>
              </div>
            </div>
          )}
        </div>

        {/* Company Information */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Company Name</label>
              <p className="mt-1 text-sm text-gray-900">{company.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Location</label>
              <p className="mt-1 text-sm text-gray-900">{company.location}</p>
            </div>
            {company.website && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Website</label>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {company.website}
                </a>
              </div>
            )}
            {company.linkedin && (
              <div>
                <label className="block text-sm font-medium text-gray-500">LinkedIn</label>
                <a
                  href={company.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 text-sm text-indigo-600 hover:text-indigo-500"
                >
                  {company.linkedin}
                </a>
              </div>
            )}
            {company.industry && (
              <div>
                <label className="block text-sm font-medium text-gray-500">Industry</label>
                <p className="mt-1 text-sm text-gray-900">{company.industry}</p>
              </div>
            )}
          </div>
        </div>

        {/* Relevant Persons */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Relevant Persons</h2>
          <div className="space-y-4">
            {persons.length === 0 ? (
              <p className="text-sm text-gray-500">No persons added to this lead.</p>
            ) : (
              persons.map(({ person, isPrimary }, index) => (
                <div key={person.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-2">
                    <h3 className="font-medium text-gray-900">
                      {isPrimary ? 'Primary Contact' : `Additional Contact ${index}`}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Name</label>
                      <p className="mt-1 text-sm text-gray-900">{person.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Designation</label>
                      <p className="mt-1 text-sm text-gray-900">{person.designation}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-500">Email Addresses</label>
                      <div className="mt-1 space-y-1">
                        {Array.isArray(person.email) ? (
                          person.email.map((email, idx) => (
                            <p key={idx} className="text-sm text-gray-900">{email}</p>
                          ))
                        ) : (
                          <p className="text-sm text-gray-900">{person.email}</p>
                        )}
                      </div>
                    </div>
                    {person.phoneNumbers && person.phoneNumbers.length > 0 && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-500">Phone Numbers</label>
                        <div className="mt-1 space-y-1">
                          {person.phoneNumbers.map((phone, idx) => (
                            <p key={idx} className="text-sm text-gray-900">{phone}</p>
                          ))}
                        </div>
                      </div>
                    )}
                    {person.linkedin && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-500">LinkedIn</label>
                        <a
                          href={person.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-sm text-indigo-600 hover:text-indigo-500"
                        >
                          {person.linkedin}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Status and Progress */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Status and Progress</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Sales Task</label>
                <select
                  value={lead.status}
                  onChange={() => {}}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="SENT">SENT</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="HIRED">HIRED</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Status</label>
                <select
                  value={lead.status}
                  onChange={() => {}}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="SENT">SENT</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="HIRED">HIRED</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-6">
                {[
                  { id: 'resumeSent', label: 'Resume sent' },
                  { id: 'contractSigned', label: 'Contract Signed' },
                  { id: 'interested', label: 'Interested' },
                  { id: 'notInterested', label: 'Not Interested' },
                  { id: 'response', label: 'Response' }
                ].map(({ id, label }) => (
                  <label key={id} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={lead[id as keyof typeof lead] as boolean}
                      onChange={() => {}}
                      className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-600">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Notes</h2>
          <textarea
            value={lead.notes}
            onChange={() => {}}
            rows={4}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Timestamps */}
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-500">
            <div>
              <span>Created: </span>
              <time dateTime={lead.createdAt}>{new Date(lead.createdAt).toLocaleString()}</time>
            </div>
            <div>
              <span>Last Updated: </span>
              <time dateTime={lead.updatedAt}>{new Date(lead.updatedAt).toLocaleString()}</time>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}