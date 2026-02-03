"use client";

import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';
import { Shield, FlaskConical, Award, Activity } from 'lucide-react';

export default function TrustBar() {
  const { language } = useAppStore();
  const t = dictionary[language].trust;

  return (
    <div className="border-y border-gray-100 bg-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-gray-50 rounded-xl text-brand-dark group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
              <Activity size={24} />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider">{t.engineering}</h4> {/* Precision Engineering */}
              <p className="text-xs text-gray-400 font-medium">{t.design}</p> {/* Professional Grade */}
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-gray-50 rounded-xl text-brand-dark group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider">{t.lab}</h4>
              <p className="text-xs text-gray-400 font-medium">{t.purity}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-gray-50 rounded-xl text-brand-dark group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
              <FlaskConical size={24} />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider">{t.residue}</h4>
              <p className="text-xs text-gray-400 font-medium">{t.distillation}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
             <div className="p-3 bg-gray-50 rounded-xl text-brand-dark group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
              <Shield size={24} />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider">{t.medical}</h4>
              <p className="text-xs text-gray-400 font-medium">{t.iso}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}