import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark text-white">
      <div
        className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pb-2"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
      >
        <div className="flex items-center gap-3 px-4 mb-2">
          <button
            onClick={onBack}
            className="size-11 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 text-white touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold">
            {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6 max-w-2xl mx-auto">
        {language === 'tr' ? (
          <>
            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Genel Bakış</h2>
              <p className="text-white/80 leading-relaxed">
                Storyteller Magic, çocuklarınızın mahremiyetine saygı duyar. Bu uygulama tamamen çevrimdışı çalışır ve hiçbir kişisel veri toplamaz, saklamaz veya üçüncü taraflarla paylaşmaz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Veri Toplama</h2>
              <p className="text-white/80 leading-relaxed mb-2">
                Storyteller Magic şunları <strong>TOPLAMAZ</strong>:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-2">
                <li>Kişisel bilgiler (ad, e-posta, konum)</li>
                <li>Kullanım verileri veya analitikler</li>
                <li>Çerezler veya izleme teknolojileri</li>
                <li>Cihaz tanımlayıcıları</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Yerel Depolama</h2>
              <p className="text-white/80 leading-relaxed">
                Tüm hikaye verileri, tercihler ve ilerleme bilgileri yalnızca cihazınızda yerel olarak saklanır. Bu veriler asla sunucularımıza veya üçüncü taraf hizmetlere gönderilmez.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Üçüncü Taraf Hizmetler</h2>
              <p className="text-white/80 leading-relaxed">
                Bu uygulama üçüncü taraf analitik, reklam veya izleme hizmetleri kullanmaz. Tamamen bağımsız ve çevrimdışı çalışır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Çocukların Gizliliği</h2>
              <p className="text-white/80 leading-relaxed">
                Storyteller Magic, 13 yaş altı çocuklar için tasarlanmıştır ve COPPA (Children's Online Privacy Protection Act) gerekliliklerine uygundur. Hiçbir çocuk verisi toplanmaz veya paylaşılmaz.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Değişiklikler</h2>
              <p className="text-white/80 leading-relaxed">
                Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Herhangi bir değişiklik bu sayfada yayınlanacaktır.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">İletişim</h2>
              <p className="text-white/80 leading-relaxed">
                Gizlilik politikamız hakkında sorularınız varsa, lütfen bizimle iletişime geçin:
              </p>
              <p className="text-primary font-medium mt-2">
                storytellermagic@example.com
              </p>
            </section>

            <div className="text-center text-white/40 text-sm pt-6 border-t border-white/10">
              Son Güncelleme: 15 Mart 2026
            </div>
          </>
        ) : (
          <>
            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Overview</h2>
              <p className="text-white/80 leading-relaxed">
                Storyteller Magic respects your child's privacy. This app operates entirely offline and does not collect, store, or share any personal data with third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Data Collection</h2>
              <p className="text-white/80 leading-relaxed mb-2">
                Storyteller Magic <strong>DOES NOT</strong> collect:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-1 ml-2">
                <li>Personal information (name, email, location)</li>
                <li>Usage data or analytics</li>
                <li>Cookies or tracking technologies</li>
                <li>Device identifiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Local Storage</h2>
              <p className="text-white/80 leading-relaxed">
                All story data, preferences, and progress are stored locally on your device only. This data is never sent to our servers or any third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Third-Party Services</h2>
              <p className="text-white/80 leading-relaxed">
                This app does not use any third-party analytics, advertising, or tracking services. It operates completely independently and offline.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Children's Privacy</h2>
              <p className="text-white/80 leading-relaxed">
                Storyteller Magic is designed for children under 13 and complies with COPPA (Children's Online Privacy Protection Act) requirements. No child data is collected or shared.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Changes to This Policy</h2>
              <p className="text-white/80 leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-primary mb-3">Contact Us</h2>
              <p className="text-white/80 leading-relaxed">
                If you have questions about our privacy policy, please contact us at:
              </p>
              <p className="text-primary font-medium mt-2">
                storytellermagic@example.com
              </p>
            </section>

            <div className="text-center text-white/40 text-sm pt-6 border-t border-white/10">
              Last Updated: March 15, 2026
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
