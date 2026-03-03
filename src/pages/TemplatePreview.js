import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getTemplateById } from '../data/websiteTemplates';
import './TemplatePreview.css';

const baseUrl = process.env.PUBLIC_URL || '';

function TemplatePreview() {
  const { id } = useParams();
  const template = id ? getTemplateById(id) : null;

  if (!template) {
    return (
      <div className="template-preview template-preview--not-found">
        <div className="template-preview-message">
          <h1>Template not found</h1>
          <p>The template you requested could not be found.</p>
          <Link to="/templates" className="btn-primary">
            Back to Templates
          </Link>
        </div>
      </div>
    );
  }

  const iframeSrc = baseUrl + template.previewUrl;

  return (
    <div className="template-preview">
      <header className="template-preview-header">
        <div className="template-preview-header-inner">
          <span className="template-preview-title">Preview: {template.name}</span>
          <div className="template-preview-actions">
            <Link to="/templates" className="btn-secondary template-preview-back">
              Back to Templates
            </Link>
            <Link to={`/templates/checkout/${template.id}`} className="btn-primary">
              Purchase
            </Link>
          </div>
        </div>
      </header>
      <iframe
        title={`Preview of ${template.name}`}
        src={iframeSrc}
        className="template-preview-iframe"
      />
    </div>
  );
}

export default TemplatePreview;
