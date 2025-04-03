import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('man_wifi_register')
export class WifiRegisterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ name: 'welcome_title' })
  welcomeTitle: string;

  @Column({ name: 'welcome_html' })
  welcomeHtml: string;

  @Column({ name: 'css_button_color' })
  cssButtonColor: string;

  @Column({ name: 'css_button_text_color' })
  cssButtonTextColor: string;

  @Column({ name: 'css_button_text_size' })
  cssButtonTextSize: string;

  @Column({ name: 'powered_by_node' })
  poweredByNode: string;

  @Column({ name: 'multiple_registers' })
  multipleRegisters: string;

  @Column({ name: 'auto_redirect_url' })
  autoRedirectUrl: string;

  @Column({ name: 'disclaimer_html', nullable: true })
  disclaimerHtml: string;

  @Column({ name: 'disclaimer_short', nullable: true })
  disclaimerShort: string;

  @Column({ name: 'welcome_css' })
  welcomeCss: string;

  @Column({ name: 'form_image', nullable: true })
  formImage: string;

  @Column({ name: 'staff_pin' })
  staffPin: string;

  @Column()
  status: string;
}
